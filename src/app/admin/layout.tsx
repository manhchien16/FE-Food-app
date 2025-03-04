'use client'
import React, { ReactNode, useState } from "react";
import {
    AccountBookOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PlusCircleOutlined,
    ProductOutlined,
    ReadOutlined,
    ShoppingCartOutlined,
    UploadOutlined,
    UserAddOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Footer } from "antd/lib/layout/layout";


const { Header, Sider, Content } = Layout;

type Props = {
    children: ReactNode;
};

const AdminLayout: React.FC<Props> = ({ children }) => {

    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo text-white p-4 text-center" >VMC ADMIN</div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'Users',
                            children:
                                [
                                    {
                                        key: 'adduser',
                                        icon: <UserAddOutlined />,
                                        label: 'Add user'
                                    },
                                    {
                                        key: 'listusers',
                                        icon: <ReadOutlined />,
                                        label: 'List Users'
                                    }
                                ]
                        },
                        {
                            key: '2',
                            icon: <ProductOutlined />,
                            label: 'Products',
                            children:
                                [
                                    {
                                        key: 'addproduct',
                                        icon: <PlusCircleOutlined />,
                                        label: 'Add products'
                                    },
                                    {
                                        key: 'listproducts',
                                        icon: <ReadOutlined />,
                                        label: 'List products'
                                    }
                                ]
                        },
                        {
                            key: '3',
                            icon: <AccountBookOutlined />,
                            label: 'Orders',
                            children:
                                [
                                    {
                                        key: 'addorder',
                                        icon: <PlusCircleOutlined />,
                                        label: 'Add order'
                                    },
                                    {
                                        key: 'listorders',
                                        icon: <ReadOutlined />,
                                        label: 'List orders'
                                    }
                                ]
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 520,
                    }}
                >
                    Content
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Pizza VMC ©2024 Created by VMC UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;


