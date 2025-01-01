import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";


export const productService = createApi({
    reducerPath: "product",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        // get product
        getProduct: builder.query<any, any>({
            query: (data) => ({
                url: '/api/products',
                method: 'get',
                params: data,
            }),
        }),
        getProductById: builder.query<any, string>({
            query: (id) => ({
                url: `/api/products/${id}`,
                method: 'GET',
            })
        }),
        getCategories: builder.query<any, void>({
            query: () => ({
                url: "/api/categories",
                method: "GET",
            })
        }),
        getMaxMinPrice: builder.query<any, any>({
            query: (id) => ({
                url: `/api/minmax/category`,
                method: "GET",
                params: { id: id }
            })
        })
    }),
});

export const {
    useGetMaxMinPriceQuery,
    useGetCategoriesQuery,
    useLazyGetMaxMinPriceQuery,
    useLazyGetProductByIdQuery,
    useGetProductByIdQuery,
    useGetProductQuery,
    useLazyGetProductQuery
} = productService;