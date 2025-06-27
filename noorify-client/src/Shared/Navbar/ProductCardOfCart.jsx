import React from 'react';
import { BsBagXFill } from 'react-icons/bs';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/UseAxioxSecure/useAxiosSecure';
import useCarts from '../../Hooks/useCarts/useCarts';

const ProductCardOfCart = ({ product }) => {

    const axiosSecure = useAxiosSecure();
    const [carts, refetchCart] = useCarts();

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
        <div>
            <div className='bg-white border-b-2 border-black justify-between flex gap-2 items-center px-3'>
                <img className='max-w-20 md:max-w-32' src={product?.image} alt="" />
                <div className='flex flex-col items-center gap-2'>
                    <p className='max-w-20 text-center text-xs'>{product?.category}</p>
                    <p className='font-medium'>{product?.price} Tk</p>
                </div>
                <button
                    onClick={() => handleCartDelete(product?.cartId)}
                    className='text-2xl text-center w-20 flex items-center justify-center'>
                    <BsBagXFill
                        className='text-red-600' />
                </button>
            </div>
        </div>
    );
};

export default ProductCardOfCart;