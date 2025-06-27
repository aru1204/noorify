import React from 'react';
import { Helmet } from 'react-helmet';
import useAllOrders from '../../../Hooks/useAllOrders/useAllOrders';
import AdminOrdersCard from './AdminOrdersCard';

const AdminDeliveredOrders = () => {

    const [allOrders, refetch] = useAllOrders();
    const deliveredOrders = allOrders?.filter(order => order.status === "Delivered");

    return (
        <div>
            <Helmet>
                <title>Noorify | Admin | Delivered Orders</title>
            </Helmet>

            <div>
                <p className='font-medium text-white text-3xl text-center pb-5 md:pb-10'>Delivered Orders ( {deliveredOrders?.length} )</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    deliveredOrders.map((order, index) =>
                        <AdminOrdersCard key={index} order={order}></AdminOrdersCard>)
                }
            </div>
        </div>
    );
};

export default AdminDeliveredOrders;