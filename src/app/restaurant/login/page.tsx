'use client'
import { Button, Form, Input, Typography } from 'antd';
import Link from 'next/link';
import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons';
import * as Yup from "yup"
import { Formik } from 'formik';
import { useLoginMutation } from '@/redux-setup/service/api/authService';
import { useAuth } from '@/share/hook/userAuth';
import { useRouter } from 'next/navigation';

const CreateSchema = Yup.object().shape({
    userName: Yup.string()
        .min(5, 'Too Short')
        .max(50, 'Too Long')
        .required('Please log in to your account.'),
    password: Yup.string()
        .min(6, 'Too Short')
        .max(50, 'Too Long')
        .required('Please log in to your password.'),
});

const Login = () => {
    //Trình duyệt không cho phép gửi yêu cầu từ http://localhost:3000 (frontend) tới https://accounts.google.com do CORS policy.
    //Google OAuth không hỗ trợ yêu cầu cross-origin từ frontend
    const [loginDefaul, { isLoading, isSuccess, isError }] = useLoginMutation();
    const { login } = useAuth();
    const router = useRouter();

    const onClickLoginByFacebook = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const link = 'http://localhost:5000/api/auth/facebook'
        window.location.href = link;
    };

    const onClickLoginByGoogle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const link = 'http://localhost:5000/api/auth/google'
        window.location.href = link;
    };
    return (
        <Formik
            initialValues={{
                userName: '',
                password: '',
            }}
            validationSchema={CreateSchema}
            onSubmit={async (values) => {
                const res = await loginDefaul(
                    { userName: values.userName, password: values.password }
                ).unwrap();
                console.log(res?.user);
                await login({
                    _id: res?.user?._id,
                    fullName: res?.user?.fullName,
                    email: res?.user?.email,
                    phoneNumber: res?.user?.phoneNumber,
                    address: res?.user?.address,
                    accessToken: res?.accessToken,
                });

                router.push("/restaurant");
            }}

        >
            {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
                <div style={{ maxWidth: 400, margin: '50px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8, backgroundColor: '#fff' }}>
                    <h2 style={{ textAlign: 'center' }}>Login</h2>

                    <Form name="login_form" layout="vertical" onFinish={handleSubmit}>
                        <Form.Item
                            label={
                                <Typography.Text>
                                    UserName <span style={{ color: "red" }}>*</span>
                                </Typography.Text>
                            }
                            validateStatus={errors.userName && touched.userName ? "error" : ""}
                            help={touched.userName && errors.userName ? errors.userName : ""}>
                            <Input
                                name="userName"
                                placeholder="Enter your username"
                                value={values.userName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Item>

                        <Form.Item
                            label={
                                <Typography.Text>
                                    Password <span style={{ color: "red" }}>*</span>
                                </Typography.Text>
                            }
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
                                Login
                            </Button>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                style={{
                                    marginTop: 'auto',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 10
                                }}
                                onClick={onClickLoginByGoogle}
                                type="default" icon={<GoogleOutlined />} block>
                                Login by Google
                            </Button>
                            <Button
                                style={{
                                    marginTop: 'auto',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 10
                                }}
                                onClick={onClickLoginByFacebook}
                                type="default" icon={<FacebookOutlined />} block>
                                Login by Facebook
                            </Button>
                        </Form.Item>

                        <div style={{ textAlign: 'center' }}>
                            <span>Dont have an account? </span>
                            <Link style={{ color: 'blue' }} href="/restaurant/register">Register</Link>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    );
};

export default Login;

