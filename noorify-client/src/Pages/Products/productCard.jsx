import React, { useEffect, useState } from 'react';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import useAuth from '../../Hooks/UseAuth/useAuth';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/UseAxioxSecure/UseAxiosSecure';
import useFavourite from '../../Hooks/UseFavourites/useFavourite';
import useCarts from '../../Hooks/useCarts/useCarts';
import { BsFillBagCheckFill, BsFillBagPlusFill } from 'react-icons/bs';
import { FaEye } from 'react-icons/fa';

const productCard = ({ product }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [favourite, refetchFavourites] = useFavourite();
    const [carts, refetchCarts] = useCarts();
    const [isCart, setIsCart] = useState(false);
    const [isFavourite, setIsFavourite] = useState(false);

    // Check if the product is already in the favourites list
    useEffect(() => {
        const favouriteIds = favourite.map(favProduct => favProduct._id);
        setIsFavourite(favouriteIds.includes(product._id));
    }, [favourite, product._id]);

    // Check if the product is already in the cart
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
                    refetchFavourites();
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
        if (user && user.email) {
            const favourite = {
                productId: id,
                email: user.email
            };

            axiosSecure.post("/carts", favourite)
                .then(res => {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Successfully added to carts",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetchCarts();
                })
        } else {
            Swal.fire({
                title: "Please login to add to carts!",
                text: "You need to be logged in to add to carts.",
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
        <div className='border-2 border-gray-300 flex flex-col justify-between bg-white rounded-md '>
            <Link to={`/product-details/${product?._id}`}>
                <img className='md:w-44 mx-auto' src={product?.image} alt="" />
            </Link>
            <div className='p-1 md:p-3 space-y-2'>
                <Link to={`/product-details/${product?._id}`} className='flex flex-col items-center gap-0 md:gap-2'>
                    <p className='text-sm text-center line-clamp-2'>{product?.productName}</p>
                    <p className='text-lg font-medium'>{product?.price} Tk</p>
                </Link>

                <div className='flex flex-col gap-2 md:gap-5 items-center'>
                    <div className='flex justify-evenly items-center w-full'>
                        <button
                            onClick={() => handleFavourite(product?._id)}
                            disabled={isFavourite} // Disable the button if it's already in favourites
                        >
                            {
                                isFavourite ?
                                    <MdOutlineFavorite
                                        className={`text-3xl text-[#013a2c7f]`}
                                    /> :
                                    <MdOutlineFavoriteBorder className={`text-3xl text-[#013a2c]`} />

                            }

                        </button>
                        <Link
                            className='underline font-medium'
                            to={`/product-details/${product?._id}`}
                        >
                            View
                        </Link>
                        <button
                            onClick={() => handleCart(product?._id)}
                            disabled={isCart} // Disable the button if it's already in favourites
                        >
                            {
                                isCart ?
                                    <BsFillBagCheckFill className={`text-3xl text-[#013a2c7f]`} />
                                    :
                                    <BsFillBagPlusFill
                                        className={`text-3xl text-[#013a2c]`}
                                    />
                            }

                        </button>
                    </div>
                    <a href={`/buy-now/${product?._id}`} className='bg-[#013a2c] w-full text-white text-center rounded-md py-1 font-medium'>
                        Byu now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default productCard;
