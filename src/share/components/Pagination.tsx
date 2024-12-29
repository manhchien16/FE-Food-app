import { Pagination } from 'antd';
import React from 'react';
import type { PaginationProps } from 'antd';

interface paginationProps {
    pagination: any;
    setCurrentPage: (page: number) => void;
}

const Paginations: React.FC<paginationProps> = ({ pagination, setCurrentPage }) => {
    const current = parseInt(pagination?.page);
    const totalItem = parseInt(pagination?.totalItem);
    const pageSize = parseInt(pagination?.pageSize);

    const onChange: PaginationProps['onChange'] = (page) => {
        console.log(page);

        setCurrentPage(page);
    };

    return (
        <Pagination
            current={current}
            onChange={onChange}
            total={totalItem}
            pageSize={pageSize}
        />
    );
};

export default Paginations;
