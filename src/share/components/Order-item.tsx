import { MdOutlineLocalShipping } from "react-icons/md";
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, Empty, Row } from "antd";
import { useGetOrderByStatusQuery, useUpdateStatusMutation } from "@/redux-setup/service/api/orderService";
import { useAuth } from "../hook/userAuth";
import OrderDetailItems from "./OrderDetail-item";
import moment from 'moment';
import Swal from "sweetalert2";

interface keyProps {
    status: string;
    dateTime: any;
}

const OrderItem: React.FC<keyProps> = ({ status, dateTime }) => {
    const { user } = useAuth()

    const { data, isSuccess, isLoading, isError, refetch } = useGetOrderByStatusQuery({
        status: status,
        id: user?._id || "",
        startDate: dateTime?.[0] || "",
        endDate: dateTime?.[1] || ""
    });
    const [updateStatus, { isSuccess: updateSucess }] = useUpdateStatusMutation()
    const orders = data?.data?.data;

    useEffect(() => {
        refetch();
    }, [status, refetch, dateTime, updateSucess]);

    if (!orders || orders.length === 0) {
        return (
            <Empty
                style={{ height: '500px' }}
                description={
                    <span>
                        Your order is empty. Please add some items to your cart before proceeding with checkout.
                    </span>
                }
                image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
        );
    }

    const getDate = (data: any, status: string): string | undefined => {
        const dateString = (() => {
            switch (status) {
                case 'pending':
                    return data.orderDate;
                case 'shipping':
                    return data.startDeliveryDate;
                case 'shipped':
                    return data.shippedDate;
                case 'delivered':
                    return data.deliveredDate;
                case 'canceled':
                    return data.canceled;
                default:
                    return undefined;
            }
        })();

        return dateString ? moment(dateString).format('DD/MM/YYYY HH:mm') : undefined;
    };

    const onClick = async (id: any, status: any) => {
        if (status === 'cancel') {
            Swal.fire({
                title: 'Do you want to cancel this order?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await updateStatus({ _id: id, status: 'canceled' }).unwrap();
                    Swal.fire('Success', 'Already canceled!', 'success');
                }
            })
        } else if (status === 'delivered') {
            await updateStatus({ _id: id, status: 'delivered' }).unwrap();
            Swal.fire('Success', 'Thank you for using our service!', 'success');
        }
    }

    const displayButon = (status: any, id: any) => {
        switch (status) {
            case 'pending':
                return <Button type="primary" onClick={() => onClick(id, 'cancel')} style={{ backgroundColor: "#EE6D1F", marginTop: '10px', color: 'white' }}>cancel</Button>
            case 'shipping':
                return <Button type="dashed" style={{ backgroundColor: "#EE6D1F", marginTop: '10px', color: 'white' }}>contact</Button>
            case 'shipped':
                return <Button type="primary" onClick={() => onClick(id, 'delivered')} style={{ backgroundColor: "#EE6D1F", marginTop: '10px', color: 'white' }}>delivered</Button>
            case 'delivered':
                return <Button type="dashed" style={{ backgroundColor: "#EE6D1F", marginTop: '10px', color: 'white' }}>contact</Button>
            case 'canceled':
                return <Button type="dashed" style={{ backgroundColor: "#EE6D1F", marginTop: '10px', color: 'white' }}>contact</Button>
            default:
                return undefined;
        }
    }


    return (
        <>
            {orders.map((item: any, index: number) => (
                <div key={index} className="bg-white p-3">
                    <Row className='border-b border-black'>
                        <Col span={12}>
                            <h3 className='font-bold'>VMC</h3>
                        </Col>
                        <Col span={12}>
                            <div className='flex justify-end items-center'>
                                <MdOutlineLocalShipping />
                                <div className='pl-1'>{status}</div>
                            </div>
                        </Col>
                    </Row>
                    <OrderDetailItems detail={item.orderDetails} />
                    <Row>
                        <Col span={12}>
                            <div className="flex justify-start text-primary-xxl">
                                <strong className="pr-1">{status}:</strong>
                                <span className="text-text-primary">{getDate(item, status)}</span>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="flex justify-end text-primary-xxl">
                                <strong className="pr-1">Total Price:</strong>
                                <span className="text-text-primary">${item.totalPrice}</span>
                            </div>
                            <div className="flex justify-end text-primary-xxl">
                                <strong className="pr-1">Payment Method:</strong>
                                <span className="text-text-primary">{item.paymentMethod}</span>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Col>
                            {displayButon(status, item._id)}
                        </Col>
                    </Row>
                </div>
            ))}
        </>
    );
}

export default OrderItem;
