import React from 'react';
import useFavourite from '../../../Hooks/UseFavourites/useFavourite';
import { FaHeartCircleXmark } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/UseAxioxSecure/useAxiosSecure';
import { MdShoppingBag } from 'react-icons/md';
import useAuth from '../../../Hooks/UseAuth/useAuth';
// import { Helmet } from 'react-helmet';

const MobileFavourites = () => {

    const [favourite, refetch] = useFavourite();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete your favourite product!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/favourites/${id}`)
                    .then(res => {
                        refetch()
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Your favourite product has been deleted.",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
            }
        });
    }

    const handleCart = (id) => {
        const cartItem = {
            productId: id,
            email: user.email
        };

        axiosSecure.post("/carts", cartItem)
            .then(res => {
                if (res.data.message === "Already added to cart") {
                    Swal.fire({
                        position: "center",
                        icon: "info",
                        title: "Already in your cart",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Successfully added to cart",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetchCarts();
                }
            })
            .catch(error => {
                console.error("Error adding to cart:", error);
            });

    };

    return (
        <div className='md:hidden'>

            {
                favourite?.length > 0 ?
                    <div className='grid grid-cols-2 gap-3'>
                        {
                            favourite?.map(product =>
                                <div className='bg-white rounded-lg p-3 flex flex-col items-center justify-center gap-3'>
                                    <div className='h-20 w-20 flex justify-center'>
                                        <img className='h-full' src={product?.image} alt="" />
                                    </div>
                                    <div className='text-base flex flex-col items-center'>
                                        <h2 className='uppercase'>{product?.brand}</h2>
                                        <p className='font-medium'>{product?.price} Tk</p>
                                    </div>
                                    <div className='flex flex-col justify-between gap-3'>

                                        <div className='flex justify-between w-full'>
                                            <button
                                                onClick={() => handleDelete(product?.favouriteId)}>
                                                <FaHeartCircleXmark className='text-red-600 text-xl' />
                                            </button>
                                            <button
                                                onClick={() => handleCart(product?._id)} >
                                                <MdShoppingBag className='text-[#013a2c] text-xl' />
                                            </button>
                                        </div>

                                        <a target='_blank' href={product?.productLink} className='border-2 border-[#013a2c] text-sm font-medium rounded-md px-2 py-0'>Buy now</a>
                                    </div>
                                </div>
                            )
                        }
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

export default MobileFavourites;