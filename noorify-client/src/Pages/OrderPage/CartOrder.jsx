import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import useCarts from "../../Hooks/useCarts/useCarts";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../Hooks/UseAxioxSecure/UseAxiosSecure";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth/useAuth";

const districts = [
    "Dhaka", "Chattogram", "Rajshahi", "Khulna", "Barishal", "Sylhet", "Rangpur", "Mymensingh",
    "Cumilla", "Feni", "Noakhali", "Lakshmipur", "Brahmanbaria", "Chandpur", "Narsingdi", "Gazipur",
    "Narayanganj", "Tangail", "Kishoreganj", "Manikganj", "Munshiganj", "Faridpur", "Madaripur", "Shariatpur",
    "Gopalganj", "Bagerhat", "Satkhira", "Jashore", "Jhenaidah", "Magura", "Narail", "Kushtia", "Chuadanga", "Meherpur",
    "Bogura", "Joypurhat", "Naogaon", "Natore", "Chapainawabganj", "Pabna", "Sirajganj", "Jamalpur", "Netrokona", "Sherpur",
    "Habiganj", "Moulvibazar", "Sunamganj", "Patuakhali", "Pirojpur", "Bhola", "Jhalokathi", "Barguna", "Dinajpur", "Gaibandha",
    "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Thakurgaon"
];

const CartOrder = () => {
    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();
    const [carts, refetchCart] = useCarts();
    const selectedDistrict = watch("district");
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const [quantities, setQuantities] = useState({});
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    console.log(carts)

    useEffect(() => {
        setDeliveryCharge(selectedDistrict === "Dhaka" ? 50 : 120);
    }, [selectedDistrict]);

    useEffect(() => {
        setQuantities(carts.reduce((acc, item) => ({ ...acc, [item._id]: 1 }), {}));
    }, [carts]);

    const totalProductPrice = carts.reduce((total, item) => {
        return total + item.price * (quantities[item._id] || 1);
    }, 0);

    const totalCashOnDelivery = totalProductPrice + deliveryCharge;

    const handleQuantityChange = (id, value) => {
        setQuantities((prev) => ({ ...prev, [id]: Math.max(1, value) }));
    };

    const onSubmit = async (data) => {
        if (!carts.length) return Swal.fire("Error", "Your cart is empty!", "error");

        const orderItems = carts.map((item) => ({
            productId: item._id,
            cartId: item.cartId,
            quantity: quantities[item._id] || 1,
        }));

        const orderData = {
            email: user?.email,
            name: data.customerName,
            mobile: data.mobile,
            address: data.address,
            district: data.district,
            deliveryCharge,
            totalAmount: totalCashOnDelivery,
            items: orderItems,
            status: "Confirmed",
            orderDate: `${new Date().getDate()} / ${new Date().getMonth() + 1} / ${new Date().getFullYear()}`
        };

        try {
            const response = await axiosSecure.post("/orders", orderData);
            if (response.status === 200) {
                Swal.fire("Success", "Your order has been confirmed!", "success");
                refetchCart();
                reset();

            }
        } catch (error) {
            Swal.fire("Error", "Failed to place order. Try again!", "error");
        }
    };

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
        <div className="max-w-3xl mx-auto p-4">
            <Helmet>
                <title>Noorify | Order Page</title>
            </Helmet>

            <div>
                <p className='font-medium text-white text-3xl text-center py-5 md:pb-10'>Place Your Order</p>
            </div>

            {carts.length === 0 ? (
                <div className='bg-white flex flex-col items-center justify-center space-y-5 py-5 rounded-md'>
                    <p className='text-2xl text-center font-medium'>You don't have any cart products</p>
                    <Link to={"/products"} className='py-1 px-5 bg-[#013a2c] text-white rounded-lg'>Browse Products</Link>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded bg-white">
                        {carts.map((item) => (
                            <div key={item._id} className="border-b-2 border-black last:border-none p-3 flex justify-between items-center">
                                <div className="flex-1 flex flex-col gap-2">
                                    <p className="font-semibold line-clamp-2">{item.productName}</p>
                                    <p className="font-medium">Price: {item.price} BDT</p>
                                    <p className="text-sm font-medium">{`${item.price} * ${quantities[item._id]} = ${item.price * quantities[item._id]} BDT`}</p>
                                    <div className="flex items-center">
                                        <button type="button" onClick={() => handleQuantityChange(item._id, quantities[item._id] - 1)} className="p-2 border rounded">
                                            <AiOutlineMinus />
                                        </button>
                                        <input
                                            type="number"
                                            value={quantities[item._id]}
                                            min={1}
                                            onChange={(e) => handleQuantityChange(item._id, Number(e.target.value))}
                                            className="w-16 p-1 border rounded mx-2 text-center"
                                        />
                                        <button type="button" onClick={() => handleQuantityChange(item._id, quantities[item._id] + 1)} className="p-2 border rounded">
                                            <AiOutlinePlus />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col items-center justify-end gap-3">
                                    <img className="w-20" src={item?.image} alt="" />
                                    <button
                                        type="button"
                                        onClick={() => handleCartDelete(item.cartId)}
                                        className='text-sm w-20 text-red-700 font-medium text-center'
                                    >
                                        Delete from Cart
                                        {/* <BsBagXFill className='text-red-600' /> */}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white my-3 p-3 items-center md:items-start rounded flex flex-col gap-3">
                        <p className="font-semibold">Total Product Price: {totalProductPrice} BDT</p>
                        <p className="font-semibold">Delivery Charge: {deliveryCharge} BDT</p>
                        <p className="text-xl text-center md:text-start font-bold">Total Cash on Delivery: {totalCashOnDelivery} BDT</p>
                    </div>

                    <div className="my-3 bg-white p-3 rounded space-y-3">
                        <div className="space-y-2">
                            <label>Your Name</label>
                            <input {...register("customerName", { required: "Name is required" })} placeholder="Full Name" className="w-full p-2 border rounded" />
                            {errors.customerName && <span className="text-red-500 text-sm">{errors.customerName.message}</span>}
                        </div>

                        <div className="space-y-2">
                            <label>Mobile Number</label>
                            <input {...register("mobile", { required: "Mobile Number is required" })} placeholder="Mobile Number" className="w-full p-2 border rounded" />
                            {errors.mobile && <span className="text-red-500 text-sm">{errors.mobile.message}</span>}
                        </div>

                        <div className="space-y-2">
                            <label>Delivery Address (in details)</label>
                            <textarea {...register("address", { required: "Delivery Address is required" })} placeholder="Delivery Address" className="w-full p-2 border rounded" />
                            {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
                        </div>

                        <div className="space-y-2">
                            <label>Your District</label>
                            <select {...register("district", { required: "District is required" })} className="w-full p-2 border rounded">
                                <option value="">Select District</option>
                                {districts.map((district) => (
                                    <option key={district} value={district}>{district}</option>
                                ))}
                            </select>
                            {errors.district && <span className="text-red-500 text-sm">{errors.district.message}</span>}
                        </div>
                    </div>

                    <button type="submit" className="bg-[#013a2c] border-2 border-white font-medium text-white p-3 my-5 hover:bg-white hover:text-[#013a2c]  rounded w-full" disabled={!carts.length}>
                        Order Confirmed
                    </button>
                </form>
            )}
        </div>
    );
};

export default CartOrder;