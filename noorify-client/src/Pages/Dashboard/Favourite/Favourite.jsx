import React from 'react';
import useFavourite from '../../../Hooks/UseFavourites/useFavourite';
import { FaHeartCircleXmark } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/UseAxioxSecure/useAxiosSecure';
import { Helmet } from 'react-helmet';
import MobileFavourites from './MobileFavourites';
import { MdShoppingBag } from 'react-icons/md';
import useAuth from '../../../Hooks/UseAuth/useAuth';

const Favourite = () => {

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
        <div>
            <Helmet>
                <title>Noorify | Favourite Products</title>
            </Helmet>

            <div>
                <p className='font-medium text-white text-3xl text-center pb-5 md:pb-10'>Favourite Products ( {favourite.length} )</p>
                {/* <div className="flex w-full flex-col">
                    <div className="divider divider-neutral"></div>
                </div> */}
            </div>

            {/* For Mobile Screen */}

            <MobileFavourites></MobileFavourites>

            {/* For Big Screen  */}

            <div className='hidden md:block'>
                {
                    favourite?.length > 0 ?
                        <div className="overflow-x-auto">
                            <table className="table bg-white">
                                {/* head */}
                                <thead className='bg-[#013a2c]'>
                                    <tr>
                                        <th className='text-xl text-white text-center'>No</th>
                                        <th className='text-xl text-white text-center'>Image</th>
                                        <th
                                            className='text-xl text-white text-center'>Category</th>
                                        <th
                                            className='text-xl text-white text-center'>Price</th>
                                        <th
                                            className='text-xl text-white text-center'>Cancel favourite</th>
                                        <th
                                            className='text-xl text-white text-center'>Add cart</th>
                                        <th
                                            className='text-xl text-white text-center'>View Product</th>
                                    </tr>
                                </thead>
                                {
                                    favourite.map((product, index) =>
                                        <tbody key={index}>
                                            {/* row 1 */}
                                            <tr>
                                                <th
                                                    className='text-base text-center'>{index + 1}</th>
                                                <td
                                                    className='uppercase text-center text-base font-medium'>
                                                    <Link to={`/product-details/${product?._id}`} className='w-20 h-20 flex justify-center'>
                                                        <img className='h-full' src={product.image} alt="" />
                                                    </Link></td>
                                                <td
                                                    className='uppercase text-center text-base font-medium'>{product?.category}</td>
                                                <td
                                                    className='font-medium text-base text-center'>{product?.price} Tk</td>
                                                <td
                                                    className='text-2xl text-center'>
                                                    <button onClick={() => handleDelete(product?.favouriteId)} className=''>
                                                        <FaHeartCircleXmark className='text-red-600' />
                                                    </button>
                                                </td>
                                                <td
                                                    className='text-2xl text-center'>
                                                    <button onClick={() => handleCart(product?._id)} className=''>
                                                        <MdShoppingBag className='text-[#013a2c]' />
                                                    </button>
                                                </td>
                                                <td className='text-base text-center'>
                                                    <a className='border-2 border-[#013a2c] font-medium rounded-lg px-5 py-1'>Buy now</a>
                                                </td>
                                            </tr>

                                        </tbody>
                                    )
                                }
                            </table>
                        </div>
                        :
                        <div className='bg-white flex flex-col items-center justify-center space-y-5 py-5 rounded-md'>
                            <p className='text-2xl text-center font-medium'>You don't have any favourite products</p>
                            <Link to={"/products"} className='py-1 px-5 bg-[#013a2c] text-white rounded-lg'>Browse Products</Link>
                        </div>
                }

            </div>
        </div>
    );
};

export default Favourite;