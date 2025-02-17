"use client";
import React from 'react';
import './globals.css';
import 'antd/dist/antd.css';
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import { Inter } from 'next/font/google';
import HeaderComponents from '@/share/components/layout/Header';
import Breadcrumb from '@/share/components/layout/Breadcrumb';
import { Container } from 'react-bootstrap';
import NavBar from '@/share/components/layout/Nav-bar';
import { Provider } from 'react-redux';
import { persistor, store } from '@/redux-setup/store';
import { PersistGate } from 'redux-persist/integration/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Simple Todo App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Layout>
              <Header style={{ backgroundColor: '#EE6D1F', padding: '0 10px', height: '100%' }}>
                <Container>
                  <HeaderComponents />
                </Container>
              </Header>
              <div className='bg-#dfdfdf flex justify-center items-center'>
                <NavBar />
              </div>
              <Container>
                <Breadcrumb />
                <Content>
                  {children}
                </Content>
              </Container>

              <Footer style={{ textAlign: 'center' }}>
                Pizza VMC ©2024 Created by VMC UED
              </Footer>
            </Layout>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
