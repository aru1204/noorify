import React from 'react';
import useCarts from '../../../Hooks/useCarts/useCarts';
import useAxiosSecure from '../../../Hooks/UseAxioxSecure/useAxiosSecure';
import useAuth from '../../../Hooks/UseAuth/useAuth';
import { FaHeartCircleXmark } from 'react-icons/fa6';
import { MdShoppingBag } from 'react-icons/md';
import { BsBagXFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const MobileCart = () => {

    const [carts, refetchCart] = useCarts();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    const totalProductPrice = carts.reduce((total, item) => {
        return total + item.price;
    }, 0);

    console.log(carts)

    const handleCartDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete your cart product!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        refetchCart()
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Your cart product has been deleted.",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
            }
        });
    }

    return (
        <div className='md:hidden'>

            {
                carts?.length > 0 ?
                    <div>
                        <div className='grid grid-cols-2 gap-3'>
                            {
                                carts?.map(product =>
                                    <div key={product?._id} className='bg-white rounded-lg p-3 flex flex-col items-center justify-center gap-3'>
                                        <Link to={`/product-details/${product?._id}`} className='h-20 w-20 flex justify-center'>
                                            <img className='h-full' src={product?.image} alt="" />
                                        </Link>
                                        <Link to={`/product-details/${product?._id}`} className='text-base flex flex-col items-center'>
                                            <h2 className='uppercase'>{product?.brand}</h2>
                                            <p className='font-medium'>{product?.price} Tk</p>
                                        </Link>
                                        <div className='flex flex-col justify-between gap-3'>

                                            <div className='flex justify-center w-full'>
                                                {/* <button
                                                onClick={() => handleDelete(product?.favouriteId)}>
                                                <FaHeartCircleXmark className='text-red-600 text-xl' />
                                            </button> */}
                                                <button
                                                    onClick={() => handleCartDelete(product?.cartId)} >
                                                    <BsBagXFill className='text-[#013a2c] text-xl' />
                                                </button>
                                            </div>

                                            <a href={`/product-details/${product?._id}`} className='border-2 border-[#013a2c] text-sm font-medium rounded-md px-2 py-0'>Details</a>
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                        <div className="bg-white my-3 p-3 items-center md:items-start rounded flex flex-col gap-3">
                            <p className="font-semibold text-xl">Total Product Price: {totalProductPrice} BDT</p>
                        </div>

                        <div>
                            <button
                                onClick={() => navigate("/cart-order-page")}
                                type="button"
                                className="bg-[#013a2c] border-2 border-white font-medium text-white p-3 my-3 hover:bg-white hover:text-[#013a2c] rounded w-full">
                                Please confirm your order
                            </button>
                        </div>
                    </div>
                    :
                    <div className='bg-white flex flex-col items-center justify-center space-y-5 py-5 rounded-md'>
                        <p className='text-2xl text-center font-medium'>You don't have any favourite products</p>
                        <Link to={"/"} className='py-1 px-5 bg-[#013a2c] text-white rounded-lg'>Browse Products</Link>
                    </div>
            }

        </div>
    );
};

export default MobileCart;