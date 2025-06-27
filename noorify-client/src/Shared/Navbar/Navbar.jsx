import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaRegUserCircle, FaTimes } from 'react-icons/fa';
import useFavourite from '../../Hooks/UseFavourites/useFavourite';
import "./navbar.css"
import useAuth from '../../Hooks/UseAuth/useAuth';
import useAdmin from '../../Hooks/useAdmin/useAdmin';
import 'animate.css';
import logo from '../../assets/logo.png'
import { MdOutlineFavorite } from 'react-icons/md';
import useCarts from '../../Hooks/useCarts/useCarts';
import { BsFillBagFill } from 'react-icons/bs';
import ProductCardOfCart from './ProductCardOfCart';

const Navbar = () => {

    const { user, logoutUser } = useAuth();
    const [isAdmin] = useAdmin();
    const [favourite] = useFavourite();
    const [carts, refetchCart] = useCarts();
    const [menuOpen, setMenuOpen] = useState(false);

    const menuLink = <>
        <ul className='flex font-medium items-center justify-center md:gap-5 md:text-base text-sm  gap-3'>
            <li><NavLink to={"/"}>Home</NavLink></li>
            <li><NavLink to={"/products"}>Shop</NavLink></li>
            <li><NavLink to={"/all-videos"}>Videos</NavLink></li>
            <li><NavLink to={"/dashboard/your-questions"}>Q & A</NavLink></li>
            {
                user && isAdmin && <li><NavLink to={"/dashboard/admin-home"}>Dashboard</NavLink></li>
            }
            {
                user && !isAdmin && <li><NavLink to={"/dashboard/user-home"}>Dashboard</NavLink></li>
            }
        </ul>
    </>

    const handleLogout = () => {
        logoutUser()
            .then(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Logout Successfully",
                    showConfirmButton: false,
                    timer: 2000
                });
            })
            .catch(() => {
            })
    }

    return (
        <div className='border-b-2 border-white'>
            <div className=''>
                <div className='gap-2 md:gap-4 grid-flow-row-dense grid grid-cols-8 px-5 py-2 md:px-5 max-w-7xl mx-auto md:py-5 text-white'>

                    {/* Logo */}
                    <Link to={"/"} className=" md:col-span-2 col-span-3 "><img className='w-10 md:w-14 rounded-full border-2 border-white' src={logo} alt="" /></Link>

                    {/* Menu Link  */}
                    <div className='col-span-8 md:col-span-4 flex justify-center items-center sticky top-0 '>
                        {
                            menuLink
                        }
                    </div>

                    {/* Auth Setup  */}
                    {
                        user ?
                            <>
                                <div className="flex md:col-span-2 col-span-5 justify-end items-center gap-5">

                                    {/* Favorite Icon  */}
                                    <Link className='relative' to={"/dashboard/favourite"}>
                                        <div className='flex justify-center items-center absolute rounded-full md:bottom-4 bottom-3 left-4 md:left-5 w-4 md:w-5 md:h-5 h-4 bg-white font-bold text-[#013a2c]'>
                                            {favourite.length}
                                        </div>
                                        <MdOutlineFavorite className='md:text-3xl text-2xl' />
                                    </Link>

                                    {/* Cart Icon  */}
                                    <Link
                                        className='relative'
                                        // onClick={() => setMenuOpen(true)}
                                        to={"/cart-order-page"}
                                    >
                                        <div className='flex justify-center items-center absolute rounded-full md:bottom-4 bottom-3 left-4 md:left-5 w-4 md:w-5 md:h-5 h-4 bg-white font-bold text-[#013a2c]'>
                                            {carts.length}
                                        </div>
                                        <BsFillBagFill className='md:text-3xl text-2xl' />
                                    </Link>

                                    {/* User Profile Icon  */}
                                    <Link to={"/dashboard/profile"}>
                                        <FaRegUserCircle className='md:text-3xl text-xl' />
                                    </Link>

                                    {/* Logout Button  */}
                                    <button
                                        onClick={handleLogout}
                                        className='md:px-5 px-3 py-0 md:py-1 rounded-md border-2 border-white'>Logout</button>
                                </div>
                            </> :
                            <>
                                <div className="flex items-center justify-end md:col-span-2 col-span-5 gap-3 md:gap-5">

                                    {/* Register Button  */}
                                    <Link
                                        to={"/register"}
                                        className='md:px-5 px-3 py-0 md:py-1 h-fit rounded-md md:border-2 md:border-white'>Register</Link>

                                    {/* Login Button  */}
                                    <Link
                                        to={"/login"}
                                        className='md:px-5 px-3 py-0 md:py-1 h-fit rounded-md md:border-2 md:border-white'>Login</Link>
                                </div>
                            </>
                    }

                </div>
            </div>
            {/* Slide Menu */}
            {/* {menuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
                    <div className="fixed top-0 right-0 h-full w-72 md:w-96 bg-[#013a2c] overflow-y-scroll p-5 shadow-lg z-50">
                        
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="text-white text-2xl mb-0"
                        >
                            <FaTimes />
                        </button>

                        {
                            carts.map(product => 
                            <ProductCardOfCart key={product?._id} product={product}></ProductCardOfCart>)
                        }


                    </div>
                </div>
            )} */}
        </div>
    );
};

export default Navbar;