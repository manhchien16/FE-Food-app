"use client"
import React, { useState } from 'react';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import Information from '@/share/components/Information';
import OrderItem from '@/share/components/Order-item';
import { useAuth } from "@/share/hook/userAuth";
import FilterDateTime from '@/share/components/filterDateTime';
import ProtectedRoute from "@/hoc/ProtectedRoute";



const Profile: React.FC = () => {
    const user = useAuth().user;
    const [formattedDates, setFormattedDates] = useState<[string, string] | null>(null);
    return (
        <>
            <Tabs defaultActiveKey="1" style={{ minHeight: "100%" }}>
                <Tabs.TabPane
                    key="1"
                    tab={
                        <span>
                            <UserOutlined />
                            <strong>Information</strong>
                        </span>
                    }
                >
                    <Information user={user} />
                </Tabs.TabPane>
                <Tabs.TabPane
                    key="2"
                    tab={
                        <span>
                            <ShoppingCartOutlined />
                            <strong>Your Orders</strong>
                        </span>
                    }
                >
                    <FilterDateTime setFormattedDates={setFormattedDates} />
                    <Tabs defaultActiveKey="1" destroyInactiveTabPane>
                        <Tabs.TabPane key={'1'} tab={<span>Pending</span>}>
                            <OrderItem status={'pending'} dateTime={formattedDates} />
                        </Tabs.TabPane>
                        <Tabs.TabPane key={'2'} tab={<span>Shipping</span>}>
                            <OrderItem status={'shipping'} dateTime={formattedDates} />
                        </Tabs.TabPane>
                        <Tabs.TabPane key={'3'} tab={<span>Shipped</span>}>
                            <OrderItem status={'shipped'} dateTime={formattedDates} />
                        </Tabs.TabPane>
                        <Tabs.TabPane key={'4'} tab={<span>Delivered</span>}>
                            <OrderItem status={'delivered'} dateTime={formattedDates} />
                        </Tabs.TabPane>
                        <Tabs.TabPane key={'5'} tab={<span>Canceled</span>}>
                            <OrderItem status={'canceled'} dateTime={formattedDates} />
                        </Tabs.TabPane>
                    </Tabs>
                </Tabs.TabPane>
            </Tabs>
        </>
    )
};

export default ProtectedRoute(Profile);