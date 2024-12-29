import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Container } from 'react-bootstrap';
import { useGetCategoriesQuery } from '@/redux-setup/service/api/productService';
import { usePathname, useRouter } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];


const NavBar: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [current, setCurrent] = useState('');
    const { data, isLoading, isError } = useGetCategoriesQuery();
    const newData = data?.data?.data;
    const items: MenuItem[] = newData ? newData?.map((category: any) => ({
        label: category.title,
        key: category._id,
    })) : [];

    useEffect(() => {
        if (!pathname.startsWith('/restaurant/search')) {
            setCurrent('');
        }
    }, [pathname]);

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
        router.push(`/restaurant/search?id=${e.key}`);
    };

    return (
        <Container>
            <Menu className='' onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        </Container>
    )
};

export default NavBar;