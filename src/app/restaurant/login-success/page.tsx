"use client";
import React, { useEffect } from "react";
import { Button, Result } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/share/hook/userAuth";

const LoginSuccess: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const accessToken = searchParams.get("accessToken");
    const user = searchParams.get("user");

    const { login } = useAuth();

    useEffect(() => {
        if (user && accessToken) {
            const userData = JSON.parse(user);
            login({
                _id: userData?._id,
                fullName: userData?.fullName,
                email: userData?.email,
                phoneNumber: userData?.phoneNumber,
                address: userData?.address,
                accessToken: accessToken,
            });
        }
    }, [user, accessToken, login]);

    const handleOk = () => {
        router.push("/");
    };

    console.log("haha", useAuth().user);


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
