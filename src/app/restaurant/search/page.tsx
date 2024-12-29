"use client";
import { useGetMaxMinPriceQuery, useGetProductQuery } from '@/redux-setup/service/api/productService';
import Paginations from '@/share/components/Pagination';
import Foods from '@/share/components/Products';
import TreeCollection from '@/share/components/TreeCollection'
import { Col, Row, Spin } from 'antd'
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Search = () => {
    const getParams = useSearchParams();
    const getCategoryId = getParams.get('id');
    const getName = getParams.get('name');
    const [currentPage, setCurrentPage] = useState(1);
    const [priceRange, setPriceRange] = useState<{ minPrice: number; maxPrice: number }>({
        minPrice: 0,
        maxPrice: 0,
    });
    ;
    const minPrice = priceRange?.minPrice;
    const maxPrice = priceRange?.maxPrice
    const { data, isLoading, isSuccess, isError, refetch } = useGetProductQuery({
        name: getName,
        category_id: getCategoryId,
        page: currentPage,
        pageSize: 16,
        minPrice,
        maxPrice
    });
    const { data: dataMinMax, isLoading: loadingMinMax } = useGetMaxMinPriceQuery();

    useEffect(() => {
        refetch()
    }, [data])

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }
    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={24} lg={5}>
                    <TreeCollection setPriceRanges={setPriceRange} minMax={dataMinMax} />
                </Col>
                <Col xs={24} sm={24} md={24} lg={19}>
                    <Foods foods={data?.data?.data} />
                </Col>
            </Row>
            <div className='pt-5 flex justify-end'>
                <Paginations pagination={data?.data?.pagination} setCurrentPage={setCurrentPage} />
            </div>
        </div>
    )
}

export default Search