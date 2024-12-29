import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";


export const authService = createApi({
    reducerPath: "auth",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        // login
        login: builder.mutation<any, { userName: string; password: string }>({
            query: ({ userName, password }) => ({
                url: '/auth/login',
                method: 'POST',
                body: { userName, password }

            }),
        }),
        // refresh token
        refreshToken: builder.mutation({
            query: () => ({
                url: '/auth/refresh-token',
                method: 'POST',
            }),
        }),
        //logOut
        logOut: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            })
        })
    }),
});

export const {
    useLogOutMutation,
    useLoginMutation,
    useRefreshTokenMutation
} = authService;