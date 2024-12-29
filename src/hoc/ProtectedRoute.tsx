// hoc/ProtectedRoute.tsx
import { useAuth } from "@/share/hook/userAuth";
import { Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = (WrappedComponent: React.ComponentType) => {
    const ComponentWithProtection = (props: any) => {
        const { user } = useAuth();
        const router = useRouter();


        useEffect(() => {
            if (!user) {
                router.push('/');
            }
        }, [user, router]);

        if (!user) {
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        }

        return <WrappedComponent {...props} />;
    };

    ComponentWithProtection.displayName = `ProtectedRoute(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return ComponentWithProtection;
};

export default ProtectedRoute;
