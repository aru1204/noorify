import React from 'react';
import useAllOrders from '../../../Hooks/useAllOrders/useAllOrders';
import AdminOrdersCard from './AdminOrdersCard';
import { Helmet } from 'react-helmet';

const AdminAllOrders = () => {

    const [allOrders, refetch] = useAllOrders();

    return (
        <div>
            <Helmet>
                <title>Noorify | Admin | All Orders</title>
            </Helmet>

            <div>
                <p className='font-medium text-white text-3xl text-center pb-5 md:pb-10'>All Orders ( {allOrders?.length} )</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    allOrders.map((order, index) =>
                        <AdminOrdersCard key={index} order={order}></AdminOrdersCard>)
                }
            </div>
        </div>
    );
};

export default AdminAllOrders;