'use client';

import { Breadcrumb as AntBreadcrumb } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Breadcrumb = () => {
    const pathName = usePathname();
    const pathParts = pathName
        .split('/')
        .filter((part) => part && part !== 'restaurant'); // Loại bỏ 'restaurant'

    const generateBreadcrumbs = () => {
        const breadcrumbs = pathParts.map((part, index) => {
            const href = '/' + "restaurant/" + pathParts.slice(0, index + 1).join('/');

            return (
                <AntBreadcrumb.Item key={href}>
                    {index === pathParts.length - 1 ? (
                        <span>{part.charAt(0).toUpperCase() + part.slice(1)}</span>
                    ) : (
                        <Link href={href}>{part.charAt(0).toUpperCase() + part.slice(1)}</Link>
                    )}
                </AntBreadcrumb.Item>
            );
        });

        return breadcrumbs;
    };

    return (
        <AntBreadcrumb style={{ margin: '16px 0' }}>
            <AntBreadcrumb.Item>
                <Link href="/restaurant">Home</Link>
            </AntBreadcrumb.Item>
            {generateBreadcrumbs()}
        </AntBreadcrumb>
    );
};

export default Breadcrumb;
