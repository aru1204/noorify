import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/UseAxioxSecure/UseAxiosSecure';
import { Helmet } from 'react-helmet';
import useCarts from '../../../Hooks/useCarts/useCarts';
import { BsBagXFill } from 'react-icons/bs';
import useAuth from '../../../Hooks/UseAuth/useAuth';
import { MdOutlineFavorite } from 'react-icons/md';
import useFavourite from '../../../Hooks/UseFavourites/useFavourite';
import MobileCart from './MobileCart';

const Carts = () => {

    const [carts, refetchCart] = useCarts();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [favourite, refetchFavourites] = useFavourite();
    const [isFavourite, setIsFavourite] = useState(false);
    const navigate = useNavigate();

    const totalProductPrice = carts.reduce((total, item) => {
        return total + item.price ;
    }, 0);

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

    const handleAddFavourite = (id) => {
        const favourite = {
            productId: id,
            email: user.email
        };

        axiosSecure.post("/favourites", favourite)
            .then(res => {
                if (res.data.message === "Already added to favourite list") {
                    Swal.fire({
                        position: "center",
                        icon: "info",
                        title: "Already in your favourites",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Successfully added to favourites",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            });
    };


    return (
        <div>
            <Helmet>
                <title>Noorify | Cart Products</title>
            </Helmet>

            <div>
                <p className='font-medium text-white text-3xl text-center pb-5 md:pb-10'>Cart Products ( {carts.length} )</p>
                {/* <div className="flex w-full flex-col">
                    <div className="divider divider-neutral"></div>
                </div> */}
            </div>

            {/* For Mobile Screen */}

            <MobileCart></MobileCart>

            {/* For Big Screen  */}

            <div className='hidden md:block'>
                {
                    carts?.length > 0 ?
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
                                            className='text-xl text-white text-center'>Cancel cart</th>
                                        {/* <th
                                            className='text-xl text-white text-center'>Add favourite</th> */}
                                        <th
                                            className='text-xl text-white text-center'>View Product</th>
                                    </tr>
                                </thead>
                                {
                                    carts.map((product, index) =>
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
                                                    <button onClick={() => handleCartDelete(product?.cartId)} className=''>
                                                        <BsBagXFill
                                                            className='text-red-600' />
                                                    </button>
                                                </td>
                                                {/* <td
                                                    className='text-2xl text-center'>
                                                    <button 
                                                    onClick={() => handleAddFavourite(product?._id)} className=''
                                                    disabled={isFavourite}>
                                                        <MdOutlineFavorite className='text-[#013a2c]' />
                                                    </button>
                                                </td> */}
                                                <td className='text-base text-center'>
                                                    <a href={`/product-details/${product?._id}`} className='border-2 border-[#013a2c] font-medium rounded-lg px-5 py-1'>Details</a>
                                                </td>
                                            </tr>

                                        </tbody>
                                    )
                                }
                            </table>

                            <div className="bg-white my-3 p-3 items-center md:items-start rounded flex flex-col gap-3">
                                <p className="font-semibold text-xl">Total Product Price: {totalProductPrice} BDT</p>
                            </div>

                            <div>
                                <button
                                    onClick={() => navigate("/cart-order-page")}
                                    type="button"
                                    className="bg-[#013a2c] border-2 border-white font-medium text-white p-3 my-5 hover:bg-white hover:text-[#013a2c] rounded w-full">
                                    Please confirm your order
                                </button>
                            </div>
                        </div>
                        :
                        <div className='bg-white flex flex-col items-center justify-center space-y-5 py-5 rounded-md'>
                            <p className='text-2xl text-center font-medium'>You don't have any products on your cart</p>
                            <Link to={"/products"} className='py-1 px-5 bg-[#013a2c] text-white rounded-lg'>Browse Products</Link>
                        </div>
                }

            </div>
        </div>
    );
};

export default Carts;