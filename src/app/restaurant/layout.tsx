"use client";
import Breadcrumb from "@/share/components/layout/Breadcrumb";
import HeaderComponents from "@/share/components/layout/Header";
import NavBar from "@/share/components/layout/Nav-bar";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import { Container } from "react-bootstrap";



type Props = {
    children: ReactNode;
};

const UserLayout: React.FC<Props> = ({ children }) => {
    const pathName = usePathname();
    const hideNavBarPaths = ['/restaurant/cart', '/restaurant/profile', '/restaurant/login', '/restaurant/register'];
    const hideHeaderPaths = ['/restaurant/login', '/restaurant/register'];
    const shouldShowNavBar = hideNavBarPaths.includes(pathName);
    const shouldShowHeader = hideHeaderPaths.includes(pathName);
    return (

        <Layout>
            <Header style={{ backgroundColor: '#EE6D1F', padding: '0 10px', height: '100%' }}>
                <Container>
                    {shouldShowHeader ? null : <HeaderComponents />}
                </Container>
            </Header>
            <div className='bg-#dfdfdf flex justify-center items-center'>
                {shouldShowNavBar ? null : <NavBar />}
            </div>
            <Container style={{ minHeight: '800px' }}>
                {shouldShowHeader ? null : <Breadcrumb />}
                <Content>
                    {children}
                </Content>
            </Container>

            <Footer style={{ textAlign: 'center' }}>
                Pizza VMC ©2024 Created by VMC UED
            </Footer>
        </Layout>

    );
};

export default UserLayout;
