import { Col, Row } from 'antd';
import React from 'react'
import ProductItem from './Product-item';
import Paginations from './Pagination';

interface foodsProps {
    foods: any[] | null;
}

const Foods: React.FC<foodsProps> = ({ foods }) => {

    const newData = foods;
    return (
        <div>
            <Row gutter={[16, 16]}>
                {foods?.map((food: any) => (
                    <Col key={food.id} xs={12} sm={12} md={8} lg={6}>
                        <ProductItem product={food} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Foods;
