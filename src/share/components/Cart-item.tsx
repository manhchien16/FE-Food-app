import { useGetProductByIdQuery } from '@/redux-setup/service/api/productService';
import { Row, Col, Image, Typography, InputNumber, Form, Input, Radio, Button } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { MdDeleteOutline, MdOutlineDeleteOutline } from 'react-icons/md';
const { Text } = Typography;

interface dataProps {
    data: any;
    quantity: any;
    setCurrentQuantity: (number: number) => void
    setOrderDertailId: (number: string) => void
    onClickDeleteOrderDetail: (id: string) => void
}

const CartItem: React.FC<dataProps> = ({ data, quantity, setCurrentQuantity, setOrderDertailId, onClickDeleteOrderDetail }) => {
    const { data: productData } = useGetProductByIdQuery(data?.product_id)
    const newData = productData?.data?.data

    const onChange = (value: number | null) => {
        if (value !== null) {
            setCurrentQuantity(value);
            setOrderDertailId(data?._id);
        }
    };
    const onClick = () => {
        onClickDeleteOrderDetail(data?._id);
    }

    return (
        <Row gutter={16} className='flex justify-start items-center border-b border-black mb-1'>
            <Col xs={5} md={4} lg={4}>
                <Image
                    style={{ maxWidth: '100%' }}
                    src={newData?.thumbnail}
                    alt="Product Image"
                />
            </Col>
            <Col xs={19} md={18} lg={18}>
                <Row gutter={16} className='flex justify-start items-center'>
                    <Col xs={24}>
                        <Text strong className="break-words">{newData?.name}</Text>
                        <br />
                        <Text type="secondary" className="break-words">{newData?.description}</Text>
                    </Col>
                    <Col xs={24}>
                        <InputNumber min={1} value={quantity} max={newData?.stock} onChange={onChange} />
                    </Col>
                    <Col xs={24}>
                        <Text strong>Price: <span className='text-text-primary'>${newData?.price}</span></Text>
                    </Col>
                    <Col xs={24}>
                        <Text strong>Total: <span className='text-text-primary'>${(parseFloat(newData?.price) * quantity).toFixed(2)}</span></Text>
                    </Col>
                </Row>
            </Col>
            <Col xs={24} md={2} lg={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <MdOutlineDeleteOutline style={{ fontSize: '24px', color: 'red', paddingBottom: '5px' }} onClick={onClick} />
            </Col>
        </Row>
    )
}

export default CartItem