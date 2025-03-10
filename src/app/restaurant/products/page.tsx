"use client";
import { useGetMaxMinPriceQuery, useGetProductQuery } from '@/redux-setup/service/api/productService';
import Paginations from '@/share/components/Pagination';
import Foods from '@/share/components/Products';
import TreeCollection from '@/share/components/TreeCollection'
import { Col, Empty, Row, Spin } from 'antd'
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Search = () => {
    const getParams = useSearchParams();
    const getCategoryId = getParams.get('id');
    const getName = getParams.get('name');
    const [currentPage, setCurrentPage] = useState(1);
    const [priceRange, setPriceRange] = useState<{ minPrice: number; maxPrice: number }>();
    const minPrice = priceRange?.minPrice ?? undefined;
    const maxPrice = priceRange?.maxPrice ?? undefined
    const { data, isLoading, isSuccess, isError, refetch } = useGetProductQuery({
        name: getName,
        category_id: getCategoryId,
        page: currentPage,
        pageSize: 16,
        minPrice,
        maxPrice
    });
    const { data: dataMinMax, isLoading: loadingMinMax, refetch: refetchMaxMin } = useGetMaxMinPriceQuery(getCategoryId);

    useEffect(() => {
        refetchMaxMin
    }, [getCategoryId])

    useEffect(() => {
        refetch()
    }, [data, getCategoryId, priceRange, currentPage])

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={24} lg={5}>
                    <TreeCollection setPriceRanges={setPriceRange} minMax={dataMinMax} key={getCategoryId} />
                </Col>
                {data?.data?.pagination?.totalItem === 0 ? (
                    <div style={{ display: 'flex', justifyContent: 'center', minHeight: '600px', width: '100%' }}>
                        <Empty description={<span>No product found</span>} image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </div>
                ) : (
                    <>
                        <Col xs={24} sm={24} md={24} lg={19}>
                            <Foods foods={data?.data?.data} />
                        </Col>
                    </>
                )}
            </Row>
            <Row className="pt-5 flex justify-end">
                <Paginations pagination={data?.data?.pagination} setCurrentPage={setCurrentPage} />
            </Row>
        </>
    );
}

export default Search