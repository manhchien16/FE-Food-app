import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";
import { Iuser } from "@/types/IUser";


export const userService = createApi({
    reducerPath: "user",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        // register
        register: builder.mutation<any, Iuser>({
            query: (user) => ({
                url: '/user/register',
                method: 'POST',
                body: user,

            }),
        }),
        userUpdate: builder.mutation<any, { id: string, user: { fullName: string, phoneNumber: string, address: string, email: string } }>({
            query: ({ id, user }) => ({
                url: `/api/users/${id}`,
                method: 'PUT',
                body: user
            }),
        }),
    }),
});

export const {
    useUserUpdateMutation,
    useRegisterMutation,
} = userService;