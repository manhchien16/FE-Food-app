import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";

export const cartService = createApi({
    reducerPath: "cart",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        addOrder: builder.mutation<any, any>({
            query: (order) => ({
                url: "/api/orders",
                method: 'POST',
                body: order
            })
        }),
        onlinePaymen: (builder).mutation<any, any>({
            query: (data) => ({
                url: `/api/create-checkout-session`,
                method: `POST`,
                body: data
            })
        }),
        updateOrder: (builder).mutation<any, any>({
            query: (data) => ({
                url: "/api/orders",
                method: "PUT",
                body: data
            })
        }),
        updateStatus: (builder).mutation<any, any>({
            query: (data) => ({
                url: "/api/orders/status",
                method: "PUT",
                body: data
            })
        }),
        getOrders: (builder).query<any, any>({
            query: () => ({
                url: "/api/orders",
                method: "GET",
            })
        }),
        getOrderById: (builder).query<any, void>({
            query: (id) => ({
                url: `/api/orders/${id}`,
                method: "GET",
            })
        }),
        getOrderByStatus: (builder).query<any, any>({
            query: (data) => ({
                url: `/api/status/orders`,
                method: "GET",
                params: data
            })
        }),
        getOrderDetails: (builder).query<any, any>({
            query: (id) => ({
                url: `/api/orderdetails/${id}`,
                method: "GET",
            })
        }),
        deleteOrderDetails: (builder).mutation<any, any>({
            query: (id) => ({
                url: `/api/orderdetails/${id}`,
                method: "DELETE",
            })
        }),

    }),
});

export const {
    useOnlinePaymenMutation,
    useDeleteOrderDetailsMutation,
    useAddOrderMutation,
    useUpdateOrderMutation,
    useUpdateStatusMutation,
    useGetOrderByIdQuery,
    useGetOrderByStatusQuery,
    useGetOrderDetailsQuery,
    useGetOrdersQuery,
    useLazyGetOrderByIdQuery,
    useLazyGetOrderByStatusQuery,
    useLazyGetOrderDetailsQuery,
    useLazyGetOrdersQuery,
} = cartService;