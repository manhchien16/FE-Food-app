"use client";
import { useRegisterMutation } from '@/redux-setup/service/api/userService';
import { Iuser } from '@/types/IUser';
import { Button, Form, Input } from 'antd';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

const CreateSchema = Yup.object().shape({
    userName: Yup.string()
        .min(5, 'Username is too short')
        .max(20, 'Username is too long')
        .required('Username is required'),

    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),

    phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
        .required('Phone number is required'),

    password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),

    fullName: Yup.string()
        .min(3, 'Full name is too short')
        .max(100, 'Full name is too long')
        .required('Full name is required'),

    address: Yup.string()
        .min(10, 'Address is too short')
        .max(200, 'Address is too long')
        .required('Address is required'),
});

const Register = () => {
    const [register, { data, error, isLoading, isSuccess }] = useRegisterMutation();
    const router = useRouter();

    const onclickRegister = async (values: Iuser) => {
        try {
            await register(values).unwrap();
            Swal.fire('Success!', "Create Accout Successfully", 'success');
            console.log(router.push('restaurant/login'));
        } catch (err) {
            console.log('error:', err);
        }
    }
    return (
        <Formik
            initialValues={{
                userName: "",
                email: "",
                phoneNumber: "",
                password: "",
                confirmPassword: "",
                fullName: "",
                address: "",
            }}
            validationSchema={CreateSchema}
            onSubmit={(values, { setSubmitting }) => {
                console.log('Submitted values:', values);
                onclickRegister(values);
                setSubmitting(false);
            }}
        >
            {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
                <div style={{ maxWidth: 400, margin: '50px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
                    <h2 style={{ textAlign: 'center' }}>Register</h2>
                    <Form
                        name="register_form"
                        layout="vertical"
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            label="Username"
                            validateStatus={errors.userName && touched.userName ? "error" : ""}
                            help={touched.userName && errors.userName ? errors.userName : ""}
                        >
                            <Input
                                name="userName"
                                placeholder="Enter your username"
                                value={values.userName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            validateStatus={errors.email && touched.email ? "error" : ""}
                            help={touched.email && errors.email ? errors.email : ""}
                        >
                            <Input
                                name="email"
                                placeholder="Enter your email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Phone Number"
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
                            label="Password"
                            validateStatus={errors.password && touched.password ? "error" : ""}
                            help={touched.password && errors.password ? errors.password : ""}
                        >
                            <Input.Password
                                name="password"
                                placeholder="Enter your password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Confirm Password"
                            validateStatus={errors.confirmPassword && touched.confirmPassword ? "error" : ""}
                            help={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ""}
                        >
                            <Input.Password
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Full Name"
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
                            label="Address"
                            validateStatus={errors.address && touched.address ? "error" : ""}
                            help={touched.address && errors.address ? errors.address : ""}
                        >
                            <Input
                                name="address"
                                placeholder="Enter your address"
                                value={values.address}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                style={{
                                    backgroundColor: "#EE6D1F",
                                    marginTop: 'auto',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                loading={isLoading}
                                type="primary" htmlType="submit" block>
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            )}
        </Formik>
    );
};

export default Register;