"use client";
import React, { useEffect } from "react";
import { Button, Result } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/share/hook/userAuth";
import { useLazyGetUserByTokenQuery } from "@/redux-setup/service/api/userService";

const LoginSuccess: React.FC = () => {
    const [getUser, { data: userData }] = useLazyGetUserByTokenQuery();
    const router = useRouter();
    const searchParams = useSearchParams();
    const accessToken = searchParams.get("accessToken");

    const { login } = useAuth();

    useEffect(() => {
        if (accessToken) {
            getUser({ token: accessToken });
        }
    }, [accessToken]);

    useEffect(() => {
        if (userData) {
            login({
                _id: userData?._id,
                fullName: userData?.fullName,
                email: userData?.email,
                phoneNumber: userData?.phoneNumber,
                address: userData?.address,
                accessToken: accessToken || "",
            });
        }
    }, [userData])
    const handleOk = () => {
        router.push("/restaurant");
    };


    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
            <Result
                status="success"
                title="Login Successful"
                subTitle="You have successfully logged into the system."
                extra={
                    <Button type="primary" onClick={handleOk}>
                        OK
                    </Button>
                }
            />
        </div>
    );
};

export default LoginSuccess;
