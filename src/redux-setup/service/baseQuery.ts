import { BASE_API } from "@/share/constants/app";
import { Mutex } from "async-mutex";
import axios, { AxiosError } from "axios";
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import Swal from "sweetalert2";
import { readAccessToken, writeAccessToken } from "@/ultils/storage/accessToken";
import { updateAccessToken } from "../slice/userSlice";
import { store } from "../store";
export const NODE_ENV = process.env.NEXT_PUBLIC_NODE_ENV;


interface IInstance {
    [key: string]: {
        path: string | undefined;
        instance: any;
    }
};


// create a new mutex
const mutex = new Mutex();


// Create Axios Instance
export const instance = axios.create({
    baseURL: BASE_API,
    responseType: "json",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

const refreshInstance = axios.create({
    baseURL: BASE_API,
    responseType: "json",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

instance.interceptors.request.use(
    (config: any) => {
        const accessToken = readAccessToken();
        config.headers.Authorization = 'Bearer ' + accessToken;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);



instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response) {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const newTokenResponse = await refreshInstance.post(`/auth/refresh-token`);
                    const newToken = newTokenResponse?.data?.accessToken;
                    await writeAccessToken(newToken);
                    // store.dispatch(updateAccessToken(newToken));
                    return instance(originalRequest);
                } catch (refreshError) {
                    console.error("Refresh token error:", refreshError);
                }
            }
        } else if (error.request) {
            console.error("Request data:", error.request);
        } else {
            console.error("Error message:", error.message);
        }
        return Promise.reject(error);
    }
);

const instances: IInstance = {
    api: {
        path: BASE_API,
        instance: instance,
    }
};

// Generic Function to Call APIs
const callApi = async (args: any) => {
    const method = args.method;
    const type = 'api';
    try {
        switch (method) {
            case "GET":
                return await instance.get(
                    `${instances[type].path}${args.url}`,
                    {
                        params: args.params,
                    },

                );
            case "POST":
                return await instance.post(
                    `${instances[type].path}${args.url}`,
                    args.body,
                    {
                        headers: args?.headers,
                    },
                );
            case "PUT":
                return await instance.put(
                    `${instances[type].path}${args.url}`,
                    args.body,
                    {
                        headers: args?.headers,
                    },
                );
            case "DELETE":
                return await instance.delete(
                    `${instances[type].path}${args.url}`,
                    {
                        headers: args?.headers,
                    },
                );
            default:
                return await instance.get(
                    `${instances[type].path}${args.url}`,
                    {
                        params: args.params,
                    },
                );
        }
    } catch (error) {
        throw error;
    }
}

const baseQuery: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args) => {
    await mutex.waitForUnlock();

    const response: any = {
        data: [],
    };
    let result: any = null;
    try {
        result = await callApi(args);
    } catch (err) {
        const error = err as AxiosError;
        const status = error?.response?.status;
        const errorData = error?.response?.data ?? {};
        result = error.response

        switch (status) {
            case 400:
                result = error.response?.data
                Swal.fire('Error!', result.message, 'error');
                break;
            case 403:
                break;
            case 500:
            case 501:
            case 502:
            case 503:
                result = error.response?.data
                Swal.fire('Error!', result.message, 'error');
                break;
            default:
                result = error.response?.data
                Swal.fire('Error!', result.message, 'error');
                break;
        }
        throw new Error(
            JSON.stringify({
                status: status,
                data: errorData,
            })
        );
    }
    response.data = result?.data ?? [];
    if (!('status' in response?.data)) {
        response.data.status = result?.status;
    }
    return response;
};


export default baseQuery;