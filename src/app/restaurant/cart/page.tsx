"use client";
import { useStatus } from '@/context/useStatusStateContext';
import { useDeleteOrderDetailsMutation, useLazyGetOrderByStatusQuery, useLazyGetOrderDetailsQuery, useOnlinePaymenMutation, useUpdateOrderMutation, useUpdateStatusMutation } from '@/redux-setup/service/api/orderService';
import CartItem from '@/share/components/Cart-item';
import { useAuth } from '@/share/hook/userAuth';
import { loadStripe } from '@stripe/stripe-js';
import { Row, Col, Typography, Form, Input, Radio, Button, Empty } from 'antd';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

const CreateSchema = Yup.object().shape({
    phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
        .required('Phone number is required'),

    fullName: Yup.string()
        .min(3, 'Full name is too short')
        .max(100, 'Full name is too long')
        .required('Full name is required'),

    address: Yup.string()
        .min(10, 'Address is too short')
        .max(200, 'Address is too long')
        .required('Address is required'),

    paymentMethod: Yup.string()
        .required('Payment method is required')
});

const CartPage: React.FC = () => {
    const [currentQuantity, setCurrentQuantity] = useState<any>();
    const [orderDertailId, setOrderDertailId] = useState<any>(false);
    const [localOrderDetails, setLocalOrderDetails] = useState<any>([]);
    const { user } = useAuth();
    const [dataOrders, { data: dataOrder, isSuccess: orderSuccess }] = useLazyGetOrderByStatusQuery();
    const [dataOrderDetail, { data: dataOrderDetails, isLoading }] = useLazyGetOrderDetailsQuery();
    const [updateQuantity, { isSuccess }] = useUpdateOrderMutation()
    const [deleteOrderDetail, { isLoading: deleting, isSuccess: deleteSuccess }] = useDeleteOrderDetailsMutation();
    const [updateStatus, { isLoading: updating, isSuccess: updateSucces, isError: updateError }] = useUpdateStatusMutation();
    const [payment, { isLoading: paymentLoading }] = useOnlinePaymenMutation();
    const newData = dataOrder?.data?.data[0];
    const { setStatusState } = useStatus()

    useEffect(() => {
        if (dataOrderDetails?.data?.data) {
            setLocalOrderDetails(dataOrderDetails.data.data);
        }
    }, [dataOrderDetails]);
    useEffect(() => {
        if (user) {
            dataOrders({ status: "cart", id: user?._id || "" })
        }
    }, [updateSucces])
    useEffect(() => {
        if (newData?._id) {
            dataOrderDetail(newData?._id);
        } else {
            setLocalOrderDetails([]);
        }
    }, [dataOrder, dataOrderDetail, isSuccess, deleteSuccess]);
    useEffect(() => {
        if (currentQuantity != null) {
            updateQuantity({ order_id: newData?._id, orderDetail_id: orderDertailId, quantity: currentQuantity });
        }
    }, [currentQuantity])
    const onClickDeleteOrderDetail = (id: string) => {
        deleteOrderDetail(id)
    }

    const onPayment = async (value: any) => {
        if (value.paymentMethod === 'cod') {
            await updateStatus({
                _id: newData?._id,
                status: 'pending',
                address: value?.address,
                phoneNumber: value?.phoneNumber
            }).unwrap();
            Swal.fire('Sucess', 'Order sucessfully!', 'success');
            setStatusState(true)
        } else {
            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "");
            if (!stripe) {
                Swal.fire('Error', "Stripe could not be loaded", 'error');
            } else {
                const res = await payment({ data: localOrderDetails, order_id: newData?._id });
                const sessionId = res?.data?.id;
                if (!sessionId || typeof sessionId !== "string") {
                    Swal.fire('Error', 'Failed to redirect to payment!', 'error');
                }
                const result = await stripe.redirectToCheckout({ sessionId });
                if (result?.error) {
                    console.error(result.error.message);
                    Swal.fire('Error', 'Failed to redirect to payment!', 'error');
                }
            }
        }
    }
    return (
        <div className='pt-5 pb-10'>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={16}>
                    {localOrderDetails.length === 0 ? (
                        <Empty
                            style={{ height: '500px' }}
                            description={
                                <span>
                                    {
                                        user ? "Your cart is empty. Please add some items to your cart before proceeding with checkout." : "Please log in to make a purchase."
                                    }
                                </span>
                            }
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                    ) : (
                        localOrderDetails.map((item: any) => (
                            <CartItem
                                key={item._id}
                                data={item}
                                quantity={item?.quantity}
                                setCurrentQuantity={setCurrentQuantity}
                                setOrderDertailId={setOrderDertailId}
                                onClickDeleteOrderDetail={onClickDeleteOrderDetail}
                            />
                        ))
                    )}
                </Col>
                <Col xs={24} sm={24} md={8}>
                    <Formik
                        initialValues={{
                            phoneNumber: user?.phoneNumber || '',
                            fullName: user?.fullName || '',
                            address: user?.address || '',
                            paymentMethod: 'cod',
                        }}
                        validationSchema={CreateSchema}
                        onSubmit={(values) => {
                            if (localOrderDetails.length === 0) {
                                Swal.fire('Error', 'No items in the cart to pay!', 'error');
                                return;
                            } else {
                                onPayment(values);
                            }
                        }}
                    >
                        {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
                            <div style={{ padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
                                <h2 style={{ textAlign: 'center' }}>Check Out</h2>
                                <Form
                                    name="check_out_form"
                                    layout="vertical"
                                    onFinish={handleSubmit}
                                >
                                    <Form.Item
                                        label={
                                            <Typography.Text>
                                                Phone Number <span style={{ color: "red" }}>*</span>
                                            </Typography.Text>
                                        }
                                        validateStatus={errors.phoneNumber && touched.phoneNumber ? "error" : ""}
                                        help={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : ""}
                                    >
                                        <Input
                                            name="phoneNumber"
                                            placeholder="Enter your phone number"
                                            value={values.phoneNumber}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label={
                                            <Typography.Text>
                                                Full Name <span style={{ color: "red" }}>*</span>
                                            </Typography.Text>
                                        }
                                        validateStatus={errors.fullName && touched.fullName ? "error" : ""}
                                        help={touched.fullName && errors.fullName ? errors.fullName : ""}
                                    >
                                        <Input
                                            name="fullName"
                                            placeholder="Enter your full name"
                                            value={values.fullName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label={
                                            <Typography.Text>
                                                Address <span style={{ color: "red" }}>*</span>
                                            </Typography.Text>
                                        }
                                        validateStatus={errors.address && touched.address ? "error" : ""}
                                        help={touched.address && errors.address ? errors.address : ""}
                                    >
                                        <Input.TextArea
                                            name="address"
                                            placeholder="Enter your address"
                                            value={values.address}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label={
                                            <Typography.Text>
                                                Payment Method <span style={{ color: "red" }}>*</span>
                                            </Typography.Text>
                                        }
                                        validateStatus={errors.paymentMethod && touched.paymentMethod ? "error" : ""}
                                        help={touched.paymentMethod && errors.paymentMethod ? errors.paymentMethod : ""}
                                    >
                                        <Radio.Group
                                            name="paymentMethod"
                                            value={values.paymentMethod}
                                            onChange={handleChange}
                                        >
                                            <Radio value="creditCard">Credit Card</Radio>
                                            <Radio value="cod">Cod</Radio>
                                        </Radio.Group>
                                    </Form.Item>

                                    <Form.Item>
                                        <Typography.Text
                                            strong
                                            style={{
                                                fontSize: "16px",
                                                color: "#EE6D1F",
                                                display: "flex",
                                                justifyContent: "flex-end",
                                            }}
                                        >
                                            Total Price: {`$${localOrderDetails.reduce(
                                                (acc: number, item: any) => acc + parseFloat(item.price),
                                                0
                                            )}`}
                                        </Typography.Text>
                                    </Form.Item>

                                    <Form.Item>
                                        <Button
                                            style={{
                                                backgroundColor: "#EE6D1F",
                                                marginTop: "auto",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                            type="primary"
                                            htmlType="submit"
                                            block
                                        >
                                            Pay
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </Col>
            </Row>

        </div>
    );
};

export default CartPage;
