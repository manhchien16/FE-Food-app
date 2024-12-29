'use client';

import { Breadcrumb as AntBreadcrumb } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Breadcrumb = () => {
    const pathName = usePathname();
    const pathParts = pathName.split("/").filter(Boolean);
    const lastSegment = pathParts[pathParts.length - 1] || '';

    return (
        <AntBreadcrumb style={{ margin: '16px 0' }}>
            <AntBreadcrumb.Item>
                <Link href={'/'}>Home</Link>
            </AntBreadcrumb.Item>
            <AntBreadcrumb.Item>
                {lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)}
            </AntBreadcrumb.Item>
        </AntBreadcrumb>
    );
};

export default Breadcrumb;
