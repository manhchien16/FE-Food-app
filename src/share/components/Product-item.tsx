import { Card, Badge } from 'antd';
import Link from 'next/link';
import React from 'react';

const { Meta } = Card;

interface foodsProps {
    product: any;
}

const ProductItem: React.FC<foodsProps> = ({ product }) => {
    const isSoldOut = product?.stock === 0;

    return (
        <Link href={{ pathname: '/restaurant/food-details', query: { id: product._id } }}>
            <Card bordered={true} hoverable cover={
                <div style={{ position: 'relative' }}>
                    <img src={product?.thumbnail} alt={product?.name} />
                    {isSoldOut && (
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                color: 'white',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: '24px',
                                fontWeight: 'bold',
                            }}
                        >
                            SOLD OUT
                        </div>
                    )}
                </div>
            }>
                <Meta title={product?.name} />
                <div className='min-h-max'>
                    <div className='silver-text line-clamp-2 min-h-[3rem]'>{product?.description}</div>
                    <div>promotion: {product?.promotion}</div>
                    <div className='text-text-primary flex justify-end pt-3'>${product?.price}</div>
                </div>
            </Card>
        </Link>
    );
};

export default ProductItem;
