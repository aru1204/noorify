import React from 'react';
import useAllOrders from '../../../Hooks/useAllOrders/useAllOrders';
import AdminOrdersCard from './AdminOrdersCard';
import { Helmet } from 'react-helmet';

const AdminConfirmedOrders = () => {

    const [allOrders, refetch] = useAllOrders();
    const confirmedOrders = allOrders?.filter(order => order.status === "Confirmed");

    return (
        <div>
            <Helmet>
                <title>Noorify | Admin | Confirm Orders</title>
            </Helmet>

            <div>
                <p className='font-medium text-white text-3xl text-center pb-5 md:pb-10'>Confirm Orders ( {confirmedOrders?.length} )</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    confirmedOrders.map((order, index) =>
                        <AdminOrdersCard key={index} order={order}></AdminOrdersCard>)
                }
            </div>
        </div>
    );
};

export default AdminConfirmedOrders;