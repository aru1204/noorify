import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaBars, FaBoxes, FaTimes } from 'react-icons/fa';
import { IoMdAddCircle, IoMdHome } from 'react-icons/io';
import { FaCircleUser, FaUsers } from 'react-icons/fa6';
import { AiFillProduct } from 'react-icons/ai';
import { MdHome, MdOutlineFavorite, MdOutlineVideoSettings, MdScreenSearchDesktop, MdShoppingBag } from 'react-icons/md';
import "../../Shared/Navbar/navbar.css";
import useAuth from '../../Hooks/UseAuth/useAuth';
import useAdmin from '../../Hooks/useAdmin/useAdmin';
import { IoExitOutline } from 'react-icons/io5';
import { LuMessageCircleQuestion } from 'react-icons/lu';
import { TbSettingsQuestion } from 'react-icons/tb';
import { BsFillBagFill } from 'react-icons/bs';

const MobileDashboardNavbar = () => {
    const { logoutUser } = useAuth();
    const [isAdmin] = useAdmin();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {

        Swal.fire({
            title: "Are you sure?",
            text: "You want to Logout!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {

                logoutUser()
                    .then(() => {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Logout Successfully",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                    })
                    .catch((error) => {
                    });
            }
        });


    };

    return (
        <div className="relative md:hidden min-w-full grid grid-cols-8 p-5 bg-[#013a2c] text-white">
            {/* Hamburger Icon */}
            <button
                onClick={() => setMenuOpen(true)}
                className="col-span-2 flex items-center text-2xl md:hidden"
            >
                <FaBars />
            </button>

            {/* Logo */}
            <Link to="/" className="text-2xl md:col-span-2 col-span-4 font-bold font-[sifonnFont] text-center">
                Noorify
            </Link>
            <div className='flex items-center gap-4 col-span-2'>
                <Link to={"/"}>
                    <MdHome className='text-2xl' />
                </Link>
                <button
                    onClick={handleLogout}>
                    <IoExitOutline className='text-2xl' />
                </button>
            </div>

            {/* Slide Menu */}
            {menuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
                    <div className="fixed top-0 left-0 h-full w-64 bg-[#013a2c] p-5 shadow-lg z-50">
                        {/* Close Button */}
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="text-white text-2xl mb-0"
                        >
                            <FaTimes />
                        </button>

                        {/* Menu  */}

                        <ul className="menu text-white font-medium flex flex-col gap-1">
                            {isAdmin ? (
                                <>
                                    {/* Admin Menu */}
                                    <li>
                                        <NavLink
                                            to="/dashboard/admin-home"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            <IoMdHome /> Admin Home
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/dashboard/all-user"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            <FaUsers /> All Users
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/dashboard/add-products"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            <IoMdAddCircle /> Add Products
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/dashboard/manage-products"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            <AiFillProduct /> Manage Products
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to={"/dashboard/manage-questions"}
                                            onClick={() => setMenuOpen(false)}>
                                            <TbSettingsQuestion />
                                            Manage Questions</NavLink></li>
                                    <li>
                                        <NavLink
                                            to={"/dashboard/manage-videos"}
                                            onClick={() => setMenuOpen(false)}>
                                            <MdOutlineVideoSettings />
                                            Manage Videos</NavLink></li>
                                    <li>
                                        <NavLink
                                            to={"/dashboard/manage-orders"}
                                            onClick={() => setMenuOpen(false)}>
                                            <FaBoxes />
                                            Manage Orders</NavLink></li>
                                </>
                            ) : (
                                <>
                                    {/* User Menu */}
                                    <li>
                                        <NavLink
                                            to="/dashboard/user-home"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            <IoMdHome /> User Home
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/dashboard/favourite"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            <MdOutlineFavorite /> Favourites
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to={"/dashboard/carts"}
                                            onClick={() => setMenuOpen(false)}>
                                            <MdShoppingBag />Carts
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/dashboard/profile"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            <FaCircleUser /> Profile
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to={"/dashboard/your-questions"}
                                            onClick={() => setMenuOpen(false)}>
                                            <LuMessageCircleQuestion />
                                            Your Questions</NavLink></li>
                                    <li>
                                        <NavLink
                                            to={"/dashboard/orders"}
                                            onClick={() => setMenuOpen(false)}>
                                            <BsFillBagFill />
                                            Your Orders</NavLink></li>
                                </>
                            )}
                        </ul>

                        <div className="h-[2px] flex-1 bg-white"></div>

                        <ul className='menu text-white font-medium flex flex-col gap-1'>
                            {
                                isAdmin ?
                                    <>
                                        <li>
                                            <NavLink
                                                to={"/"}>
                                                <IoMdHome /> Home</NavLink></li>
                                        {/* <li>
                                            <NavLink
                                                to={"/products"}>
                                                <MdScreenSearchDesktop />
                                                Products</NavLink></li> */}
                                        <li>
                                            <NavLink
                                                onClick={() => setMenuOpen(false)}
                                                to={"/dashboard/favourite"}>
                                                <MdOutlineFavorite />
                                                Favourites</NavLink></li>
                                        <li>
                                            <NavLink
                                                to={"/dashboard/carts"}
                                                onClick={() => setMenuOpen(false)}>
                                                <MdShoppingBag />Carts
                                            </NavLink></li>
                                        <li>
                                            <NavLink
                                                onClick={() => setMenuOpen(false)}
                                                to={"/dashboard/profile"}>
                                                <FaCircleUser />
                                                Profile</NavLink></li>
                                        <li>
                                            <NavLink
                                                onClick={() => setMenuOpen(false)}
                                                to={"/dashboard/your-questions"}>
                                                <LuMessageCircleQuestion />
                                                Your Questions</NavLink></li>
                                        <li>
                                            <NavLink
                                                onClick={() => setMenuOpen(false)}
                                                to={"/dashboard/orders"}>
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
                </div>
            )}
        </div>
    );
};

export default MobileDashboardNavbar;
