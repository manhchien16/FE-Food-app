import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Container } from 'react-bootstrap';
import { useGetCategoriesQuery } from '@/redux-setup/service/api/productService';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];


const NavBar: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams()
    const [current, setCurrent] = useState('');
    const { data, isLoading, isError } = useGetCategoriesQuery();
    const newData = data?.data?.data;
    const items: MenuItem[] = newData ? newData?.map((category: any) => ({
        label: <b>{category.title.toUpperCase()}</b>,
        key: category._id,
    })) : [];

    useEffect(() => {
        if (!pathname.startsWith('/restaurant/products') || params.has('name')) {
            setCurrent('');
        }
    }, [pathname, params]);

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
        router.push(`/restaurant/products?id=${e.key}`);
    };

    return (
        <Container>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        </Container>
    )
};

export default NavBar;