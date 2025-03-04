"use client"
import { Button, Col, Image, InputNumber, Row } from 'antd'
import React, { useState } from 'react'
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useGetProductByIdQuery } from '@/redux-setup/service/api/productService';
import { useSearchParams } from 'next/navigation';
import { useAddOrderMutation } from '@/redux-setup/service/api/orderService';
import { useAuth } from '@/share/hook/userAuth';
import Swal from 'sweetalert2';
import { useStatus } from '@/context/useStatusStateContext';

const FoodDetail: React.FC = () => {
    const [addOrder, { isLoading: addLoading }] = useAddOrderMutation()
    const searchParams = useSearchParams();
    const id = searchParams.get("id") || " ";
    const { data, isError, isLoading, isSuccess, error } = useGetProductByIdQuery(id);
    const newData = data?.data?.data;
    const { user } = useAuth();
    const { setStatusState } = useStatus()
    const [number, setNumber] = useState(1);
    console.log(number);

    const onClick = async () => {
        if (user) {
            await addOrder({
                customer_id: user?._id,
                status: "cart",
                addressOrder: user?.address || "",
                phoneNumberOrder: user?.phoneNumber || "",
                product_id: newData._id,
                quantity: number,
                note: "",
                paymentMethod: "cod",
            }).unwrap();
            Swal.fire('Success!', "Item added to cart", 'success');
            setStatusState(true);
        } else {
            Swal.fire('Error', "Please log in to make a purchase.", 'error')
        }
    };

    const onChange = (value: number | null) => {
        setNumber(value || 1);
    }
    const isSoldOut = newData?.stock === 0;

    return (
        <div className='pt-5 pb-10 border-b border-black'>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={9} lg={9}>
                    <div style={{ position: 'relative' }}>
                        <Image src={newData?.thumbnail} alt={newData?.name} />
                        {isSoldOut && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    color: 'white',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                }}
                            >
                                SOLD OUT
                            </div>
                        )}
                    </div>
                </Col>
                <Col xs={24} sm={24} md={15} lg={15} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div>
                        <h3 className="font-bold text-2xl">{newData?.name}</h3>
                        <div className="text-100">
                            <p className="break-words">
                                <strong>description:</strong> {newData?.description}
                            </p>
                            <p className="break-words">
                                <strong>promotion:</strong> {newData?.promotion}
                            </p>
                            <p className="break-words">
                                <strong>Accessories:</strong> {newData?.accessories}
                            </p>
                            <p className="break-words">
                                <strong>Price:</strong> <span className='text-text-primary'> ${newData?.price}</span>
                            </p>
                            <InputNumber style={{ margin: '5px 0' }} min={1} max={newData?.stock} defaultValue={1} onChange={onChange} />
                        </div>
                    </div>
                    <Button
                        style={{
                            backgroundColor: "#EE6D1F",
                            marginTop: '50px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        className='bottom-0'
                        type="primary"
                        icon={<ShoppingCartOutlined />}
                        onClick={onClick}
                    >
                        Add to card
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default FoodDetail;
