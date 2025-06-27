import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import "./dashboard.css"
import { IoMdAddCircle, IoMdHome } from 'react-icons/io';
import { MdOutlineFavorite, MdOutlineVideoSettings, MdScreenSearchDesktop, MdShoppingBag } from 'react-icons/md';
import { FaCircleUser } from 'react-icons/fa6';
import { FaBoxes, FaUsers } from 'react-icons/fa';
import useAdmin from '../../Hooks/useAdmin/useAdmin';
import { AiFillProduct } from 'react-icons/ai';
import MobileDashboardNavbar from './MobileDashboardNavbar';
import { LuMessageCircleQuestion } from 'react-icons/lu';
import { TbSettingsQuestion } from 'react-icons/tb';
import { BsFillBagFill } from 'react-icons/bs';

const Dashboard = () => {

    const [isAdmin] = useAdmin();

    return (
        <div className='flex flex-col md:flex-row mx-auto '>

            <MobileDashboardNavbar></MobileDashboardNavbar>

            <div className='w-64 min-h-screen border-r-2 border-white p-4 hidden md:block'>
                <ul className='menu text-white font-medium flex flex-col gap-3'>
                    {
                        isAdmin ?
                            // Admin Menu 
                            <>
                                <li>
                                    <NavLink to={"/dashboard/admin-home"}>
                                        <IoMdHome />Admin Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/dashboard/all-user"}>
                                        <FaUsers />
                                        All Users</NavLink></li>
                                <li>
                                    <NavLink to={"/dashboard/add-products"}>
                                        <IoMdAddCircle />
                                        Add Products</NavLink></li>
                                <li>
                                    <NavLink to={"/dashboard/manage-products"}>
                                        <AiFillProduct />
                                        Manage Products</NavLink></li>
                                <li>
                                    <NavLink to={"/dashboard/manage-questions"}>
                                        <TbSettingsQuestion />
                                        Manage Questions</NavLink></li>
                                <li>
                                    <NavLink to={"/dashboard/manage-videos"}>
                                        <MdOutlineVideoSettings />
                                        Manage Videos</NavLink></li>
                                <li>
                                    <NavLink to={"/dashboard/manage-orders"}>
                                        <FaBoxes />
                                        Manage Orders</NavLink></li>
                            </> :
                            // Public Menu 
                            <>
                                <li>
                                    <NavLink to={"/dashboard/user-home"}>
                                        <IoMdHome />User Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/dashboard/favourite"}>
                                        <MdOutlineFavorite />
                                        Favourites</NavLink></li>
                                <li>
                                    <NavLink to={"/dashboard/carts"}>
                                        <MdShoppingBag />
                                        Carts</NavLink></li>
                                <li>
                                    <NavLink to={"/dashboard/profile"}>
                                        <FaCircleUser />
                                        Profile</NavLink></li>
                                <li>
                                    <NavLink to={"/dashboard/your-questions"}>
                                        <LuMessageCircleQuestion />
                                        Your Questions</NavLink></li>
                                <li>
                                    <NavLink to={"/dashboard/orders"}>
                                        <BsFillBagFill />
                                        Your Orders</NavLink></li>
                            </>
                    }
                </ul>

                <div className="h-[2px] flex-1 my-6 bg-white"></div>

                <ul className='menu text-white font-medium flex flex-col gap-3'>
                    {
                        isAdmin ?
                            <>
                                <li>
                                    <NavLink to={"/"}>
                                        <IoMdHome /> Home</NavLink></li>
                                {/* <li>
                                    <NavLink to={"/products"}>
                                        <MdScreenSearchDesktop />
                                        Products</NavLink></li> */}
                                <li>
                                    <NavLink to={"/dashboard/favourite"}>
                                        <MdOutlineFavorite />
                                        Favourites</NavLink></li>
                                <li>
                                    <NavLink to={"/dashboard/carts"}>
                                        <MdShoppingBag />
                                        Carts</NavLink></li>
                                <li>
                                    <NavLink to={"/dashboard/profile"}>
                                        <FaCircleUser />
                                        Profile</NavLink></li>
                                <li>
                                    <NavLink to={"/dashboard/your-questions"}>
                                        <LuMessageCircleQuestion />
                                        Your Questions</NavLink></li>
                                <li>
                                    <NavLink to={"/dashboard/orders"}>
                                        <BsFillBagFill />
                                        Your Orders</NavLink></li>
                            </> :
                            <>
                                <li>
                                    <NavLink to={"/"}>
                                        <IoMdHome /> Home</NavLink></li>
                                <li>
                                    <NavLink to={"/products"}>
                                        <MdScreenSearchDesktop />
                                        Products</NavLink></li>
                            </>
                    }
                </ul>
            </div>
            <div className='flex-1 py-5 px-3 md:px-20 '>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;