import React from 'react';
import { Helmet } from 'react-helmet';
import { FaCheckCircle, FaTruck } from 'react-icons/fa';
import { MdOutlinePendingActions } from 'react-icons/md';
import { Link } from 'react-router-dom';
import useAllOrders from '../../../Hooks/useAllOrders/useAllOrders';
import { FaBoxesStacked } from 'react-icons/fa6';

const AdminOrderManage = () => {

    const [allOrders, refetch] = useAllOrders();
    console.log(allOrders)
    const confirmedOrders = allOrders?.filter(order => order.status === "Confirmed");
    const deliveredOrders = allOrders?.filter(order => order.status === "Delivered");
    const processingOrders = allOrders?.filter(order => order.status === "Processing");
    
    return (
        <div>

            <Helmet>
                <title>Noorify | Admin | Manage Ordders</title>
            </Helmet>

            <div>
                <p className="font-medium text-white text-3xl text-center pb-10">Manage Orders</p>
            </div>

            <div className='flex flex-col lg:flex-row gap-5 justify-between'>
                <Link to={"/dashboard/all-orders"} className='bg-white items-center flex gap-2 md:gap-3 p-3 md:p-5 rounded-xl text-base md:text-xl font-medium'>
                    <FaBoxesStacked />
                    <p>All Orders ({allOrders?.length})</p>
                </Link>
                <Link to={"/dashboard/confirmed-orders"} className='bg-white items-center flex gap-2 md:gap-3 p-3 md:p-5 rounded-xl text-base md:text-xl font-medium'>
                    <FaCheckCircle />
                    <p>Confirm Orders ({confirmedOrders?.length})</p>
                </Link>
                <Link to={"/dashboard/processing-orders"} className='bg-white items-center flex gap-2 md:gap-3 p-3 md:p-5 rounded-xl text-base md:text-xl font-medium'>
                    <MdOutlinePendingActions />
                    <p>Processing Orders ({processingOrders?.length})</p>
                </Link>
                <Link to={"/dashboard/delivered-orders"} className='bg-white items-center flex gap-2 md:gap-3 p-3 md:p-5 rounded-xl text-base md:text-xl font-medium'>
                    <FaTruck />
                    <p>Delivered Orders ({deliveredOrders?.length})</p>
                </Link>
            </div>
        </div>
    );
};

export default AdminOrderManage;