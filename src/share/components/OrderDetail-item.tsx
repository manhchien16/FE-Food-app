import { useLazyGetProductByIdQuery } from '@/redux-setup/service/api/productService';
import { Col, Image, InputNumber, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
const { Text } = Typography;

interface dataProps {
    detail: any;
}

const OrderDetailItems: React.FC<dataProps> = ({ detail }) => {
    const [productData, setProductData] = useState<any[]>([]);
    const [getProductById] = useLazyGetProductByIdQuery();
    useEffect(() => {
        const fetchProducts = async () => {
            const products = await Promise.all(
                detail.map((item: any) => getProductById(item.product_id).unwrap())
            );
            setProductData(products);
        };

        if (detail?.length) {
            fetchProducts();
        }
    }, [detail, getProductById]);
    return (
        <>
            {detail?.map((item: any, index: number) => (
                <Row key={index} gutter={16} className="flex justify-start items-center border-b border-black mb-1 mt-1">
                    <Col xs={5} md={4} lg={4}>
                        <Image
                            style={{ maxWidth: '100%' }}
                            src={productData[index]?.data?.data?.thumbnail}
                            alt="Product Image"
                        />
                    </Col>
                    <Col xs={19} md={20} lg={20}>
                        <Row gutter={16} className="flex justify-start items-center">
                            <Col xs={12} md={6} lg={6} >
                                <Text strong className="break-words">{productData[index]?.data?.data?.name || 'Product Name'}</Text>
                                <br />
                                <Text type="secondary" className="break-words">{productData[index]?.data?.data?.description || 'Product Description'}</Text>
                            </Col>
                            <Col xs={12} md={6} lg={6}>
                                <InputNumber disabled value={item.quantity} />
                            </Col>
                            <Col xs={12} md={6} lg={6}>
                                <Text strong>
                                    Price: <span className="text-text-primary">${productData[index]?.data?.data?.price}</span>
                                </Text>
                            </Col>
                            <Col xs={12} md={6} lg={6}>
                                <Text strong>
                                    Total: <span className="text-text-primary">${productData[index]?.data?.data?.price * item.quantity}</span>
                                </Text>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            ))}
        </>
    );
};

export default OrderDetailItems;
