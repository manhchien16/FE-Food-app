import { Card, Badge, Button } from 'antd';
import Link from 'next/link';
import React from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useAddOrderMutation } from '@/redux-setup/service/api/orderService';
import { useAuth } from '../hook/userAuth';
import Swal from 'sweetalert2';
import { useStatus } from '@/context/useStatusStateContext';

const { Meta } = Card;

interface foodsProps {
    product: any;
}

const ProductItem: React.FC<foodsProps> = ({ product }) => {
    const [addOrder, { isLoading: addLoading }] = useAddOrderMutation();
    const { user } = useAuth();
    const { setStatusState } = useStatus()
    const onClick = async () => {
        if (user) {
            await addOrder({
                customer_id: user?._id,
                status: "cart",
                addressOrder: user?.address || "",
                phoneNumberOrder: user?.phoneNumber || "",
                product_id: product._id,
                quantity: 1,
                note: "",
                paymentMethod: "cod",
            }).unwrap();
            Swal.fire('Success!', "Item added to cart", 'success');
            setStatusState(true);
        } else {
            Swal.fire('Error', "Please log in to make a purchase.", 'error')
        }
    };

    const isSoldOut = product?.stock === 0;
    return (
        <Card bordered={true} hoverable cover={
            <Link href={{ pathname: '/restaurant/products/food-details', query: { id: product._id } }}>
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
            </Link>
        }>
            <Link href={{ pathname: '/restaurant/products/food-details', query: { id: product._id } }}>
                <Meta title={product?.name} />
                <div className='min-h-max'>
                    <div className='silver-text line-clamp-2 min-h-[3rem]'>{product?.description}</div>
                    <div>promotion: {product?.promotion}</div>
                    <div className='text-text-primary flex justify-end pt-3'>${product?.price}</div>
                </div>
            </Link>
            <Button
                style={{
                    backgroundColor: "#EE6D1F",
                    marginTop: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '100%',
                }}
                className='bottom-0'
                type="primary"
                icon={<ShoppingCartOutlined />}
                onClick={onClick}
            >
                Add to card
            </Button>
        </Card>
    );
};

export default ProductItem;
