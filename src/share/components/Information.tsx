import React, { useEffect } from 'react';
import { Form, Input, Button, Row, Col, Spin, Typography } from 'antd';
import { Formik, Field, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { useUserUpdateMutation } from '@/redux-setup/service/api/userService';
import { useAuth } from '../hook/userAuth';
import Swal from 'sweetalert2';

const validationSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(5, 'Username is too short')
        .max(20, 'Username is too long')
        .required('Username is required'),

    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),

    phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
        .required('Phone number is required'),
    address: Yup.string()
        .min(10, 'Address is too short')
        .max(200, 'Address is too long')
        .required('Address is required'),
});

interface UserProps {
    user: any;
}

const InformationForm: React.FC<UserProps> = ({ user }) => {
    const [userUpdate, { isLoading, isSuccess, isError, error }] = useUserUpdateMutation();
    const { updateUserLocal } = useAuth();

    const onClickUpdateUser = async (id: string, values: any) => {
        await userUpdate({
            id,
            user: {
                fullName: values.fullName,
                address: values.address,
                phoneNumber: values.phoneNumber,
                email: values.email,
            },
        }).unwrap();
    };

    useEffect(() => {
        if (isError && error) {
            console.log("Error occurred:", error);
        }
    }, [isError, error]);

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <Formik
            initialValues={{
                fullName: user?.fullName || '',
                email: user?.email || '',
                phoneNumber: user?.phoneNumber || '',
                address: user?.address || '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
                const id = user._id;
                Swal.fire({
                    title: 'Do you want to update your information?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        await onClickUpdateUser(id, values);
                        if (!isError) {
                            Swal.fire('Success!', 'Update successfully!', 'success');
                            updateUserLocal({
                                fullName: values.fullName,
                                address: values.address,
                                phoneNumber: values.phoneNumber,
                                email: values.email,
                            });
                        }
                    }
                })
            }}
        >
            {({ errors, touched, handleSubmit }) => (
                <Form
                    layout="vertical"
                    onFinish={handleSubmit as unknown as (e: React.BaseSyntheticEvent) => void}
                    className="bg-white p-5"
                >
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={12} lg={12}>
                            <Form.Item
                                label={
                                    <Typography.Text>
                                        Full name <span style={{ color: "red" }}>*</span>
                                    </Typography.Text>
                                }
                                validateStatus={errors.fullName && touched.fullName ? 'error' : ''}
                                help={errors.fullName && touched.fullName ? String(errors.fullName) : undefined}
                            >
                                <Field name="fullName" as={Input} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12}>
                            <Form.Item
                                label={
                                    <Typography.Text>
                                        Email <span style={{ color: "red" }}>*</span>
                                    </Typography.Text>
                                }
                                validateStatus={errors.email && touched.email ? 'error' : ''}
                                help={errors.email && touched.email ? String(errors.email) : undefined}
                            >
                                <Field name="email" as={Input} disabled />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={24} md={12} lg={12}>
                            <Form.Item
                                label={
                                    <Typography.Text>
                                        Address <span style={{ color: "red" }}>*</span>
                                    </Typography.Text>
                                }
                                validateStatus={errors.address && touched.address ? 'error' : ''}
                                help={errors.address && touched.address ? String(errors.address) : undefined}
                            >
                                <Field name="address" as={Input} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12}>
                            <Form.Item
                                label={
                                    <Typography.Text>
                                        Phone Number <span style={{ color: "red" }}>*</span>
                                    </Typography.Text>
                                }
                                validateStatus={errors.phoneNumber && touched.phoneNumber ? 'error' : ''}
                                help={errors.phoneNumber && touched.phoneNumber ? String(errors.phoneNumber) : undefined}
                            >
                                <Field name="phoneNumber" as={Input} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item className="text-center">
                        <Button style={{ backgroundColor: '#EE6D1F' }} type="primary" htmlType="submit" loading={isLoading}>
                            Save Your Information
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </Formik>
    );
};

export default InformationForm;
