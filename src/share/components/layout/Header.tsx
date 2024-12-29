import { Button, Input, Row, Col, Badge, Typography } from 'antd';
import Link from 'next/link';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from "@/share/hook/userAuth";
import { useRouter } from 'next/navigation';
import { useLogOutMutation } from '@/redux-setup/service/api/authService';
import Swal from 'sweetalert2';
import Search from '../Search';
import React from 'react';

const { Text } = Typography;

const HeaderComponents = () => {
    const [logoutSever, { isSuccess, isLoading, isError }] = useLogOutMutation();
    const router = useRouter();
    const { user, logout } = useAuth();

    const onclickLogOut = async () => {

        Swal.fire({
            title: 'Do you want to logout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await logoutSever;
                Swal.fire('Success', 'Logout success!', 'success');
                logout();
                router.push("/restaurant/login")
            }
        })
    }

    return (
        <>
            <Row align="middle" justify="space-between" gutter={[16, 16]} className="pb-5">
                {/* Logo */}
                <Col xs={24} sm={24} md={6} lg={4}>
                    <Link href="/">
                        <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }} className="float-left">
                            VMC
                        </div>
                    </Link>
                </Col>

                {/* Search */}
                <Col
                    xs={24}
                    sm={24}
                    md={18}
                    lg={12}
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px',
                    }}
                >
                    <Search />
                </Col>

                {/* User and Cart */}
                <Col xs={24} sm={24} md={24} lg={8}>
                    <div
                        className="float-right"
                        style={{
                            textAlign: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '10px',
                            paddingRight: '10px',
                            alignItems: 'center',
                        }}
                    >
                        {user ? (
                            <>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                        color: '#fff',
                                        fontSize: '1rem',
                                    }}
                                >
                                    <UserOutlined style={{ fontSize: '1.2rem', color: '#efbbab' }} />
                                    <Text strong style={{ color: '#fff' }}>
                                        <Link className='text-white' href={{ pathname: `/restaurant/profile` }}>{user.fullName}</Link>
                                    </Text>
                                </div>
                                <Button onClick={onclickLogOut} style={{ backgroundColor: '#efbbab', color: 'white' }}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Button style={{ backgroundColor: '#efbbab', color: 'white' }}>
                                <Link href="/restaurant/login">Login</Link>
                            </Button>
                        )}
                        {/* Cart */}
                        <Badge count={3} offset={[10, 0]}>
                            <Link href="/restaurant/cart">
                                <ShoppingCartOutlined style={{ fontSize: '24px', color: '#111' }} />
                            </Link>
                        </Badge>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default HeaderComponents;
