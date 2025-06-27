import React from 'react';
import AdminOrdersCard from './AdminOrdersCard';
import { Helmet } from 'react-helmet';
import useAllOrders from '../../../Hooks/useAllOrders/useAllOrders';

const AdminProcessingOrders = () => {

    const [allOrders, refetch] = useAllOrders();
    const processingOrders = allOrders?.filter(order => order.status === "Processing");

    return (
        <div>
            <Helmet>
                <title>Noorify | Admin | Processing Orders</title>
            </Helmet>

            <div>
                <p className='font-medium text-white text-3xl text-center pb-5 md:pb-10'>Processing Orders ( {processingOrders?.length} )</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    processingOrders.map((order, index) =>
                        <AdminOrdersCard key={index} order={order}></AdminOrdersCard>)
                }
            </div>
        </div>
    );
};

export default AdminProcessingOrders;