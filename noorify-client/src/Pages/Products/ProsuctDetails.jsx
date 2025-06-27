import React, { useEffect, useState } from 'react';
import { MdOutlineFavorite, MdOutlineFavoriteBorder, MdShoppingBag } from 'react-icons/md';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/UseAuth/useAuth';
import useAxiosSecure from '../../Hooks/UseAxioxSecure/UseAxiosSecure';
import useFavourite from '../../Hooks/UseFavourites/useFavourite';
import useCarts from '../../Hooks/useCarts/useCarts';
import { BsFillBagCheckFill, BsFillBagPlusFill } from 'react-icons/bs';

const ProsuctDetails = () => {

    const product = useLoaderData();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [favourite, refetchFavourite] = useFavourite();
    const [isFavourite, setIsFavourite] = useState(false);

    useEffect(() => {
        const favouriteIds = favourite.map(favProduct => favProduct._id); // Extract product IDs from favourites
        setIsFavourite(favouriteIds.includes(product._id)); // Check if the current product ID is in favourites
    }, [favourite, product._id]);

    const [carts, refetchCarts] = useCarts();
    const [isCart, setIsCart] = useState(false);

    useEffect(() => {
        const cartIds = carts.map(cartItem => cartItem._id);
        setIsCart(cartIds.includes(product._id));
    }, [carts, product._id]);

    const handleFavourite = (id) => {
        if (user && user.email) {
            const favourite = {
                productId: id,
                email: user.email
            };

            axiosSecure.post("/favourites", favourite)
                .then(res => {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Successfully added to favourites",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetchFavourite();
                })
        } else {
            Swal.fire({
                title: "Please login to add to favourites!",
                text: "You need to be logged in to add to favourites.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: { from: location } });
                }
            });
        }
    };

    const handleCart = (id) => {
        if (user && user?.email) {
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
        } else {
            Swal.fire({
                title: "Please login to add to favourites!",
                text: "You need to be logged in to add to favourites.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: { from: location } });
                }
            });
        }


    };


    return (
        <div className='py-5 max-w-7xl mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-5 p-3 md:p-0'>
                <div>
                    <img className='rounded-xl' src={product?.image} alt="" />
                </div>
                <div className='text-white flex flex-col gap-3 items-center'>
                    <p className='text-xl font-medium text-center'>{product?.productName}</p>
                    <p className='text-2xl font-bold pb-3 text-center'>{product?.price} Tk</p>
                    <p className='text-xl text-center'>Description : </p>
                    <p className='text-base text-center pb-3'>{product?.productDescription}</p>
                    <p className='text-base text-center font-medium'>Section : {product?.section}</p>
                    <p className='text-base text-center font-medium'>Subcategory : {product?.subcategory}</p>
                    <p className='text-base text-center font-medium'>Category : {product?.category}</p>
                    <div className='flex gap-5 items-center'>
                        <button
                            onClick={() => handleFavourite(product?._id)}
                            disabled={isFavourite} // Disable the button if it's already in favourites
                        >
                            {
                                isFavourite ?
                                    <MdOutlineFavorite
                                        className={`text-3xl text-[#ffffff7f]`}
                                    /> :
                                    <MdOutlineFavoriteBorder className={`text-3xl text-[#ffffff]`} />

                            }
                        </button>
                        <button
                            onClick={() => handleCart(product?._id)}
                            disabled={isCart} // Disable the button if it's already in favourites
                        >
                            {
                                isCart ?
                                    <BsFillBagCheckFill className={`text-3xl text-[#ffffff7f]`} />
                                    :
                                    <BsFillBagPlusFill
                                        className={`text-3xl text-[#ffffff]`}
                                    />
                            }
                        </button>
                    </div>
                    <a href={`/buy-now/${product?._id}`} className='bg-[#013a2c] border-2 border-white font-medium text-white p-3 my-5 hover:bg-white hover:text-[#013a2c]  rounded w-full text-center'>
                        Byu now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProsuctDetails;