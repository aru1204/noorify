import React from 'react';
import useOrders from '../../../Hooks/useOrders/useOrders';
import OrderCard from './OrderCard';

const Orders = () => {

    const [orders, refetch] = useOrders();

    console.log(orders)

    return (
        <div>

            <OrderCard orders={orders}></OrderCard>

        </div>
    );
};

export default Orders;