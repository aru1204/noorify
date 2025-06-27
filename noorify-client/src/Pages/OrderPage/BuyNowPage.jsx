import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic/useAxiosPublic';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Hooks/UseAxioxSecure/UseAxiosSecure';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import useAuth from '../../Hooks/UseAuth/useAuth';


const BuyNowPage = () => {
    const districts = [
        "Dhaka", "Chattogram", "Rajshahi", "Khulna", "Barishal", "Sylhet", "Rangpur", "Mymensingh",
        "Cumilla", "Feni", "Noakhali", "Lakshmipur", "Brahmanbaria", "Chandpur", "Narsingdi", "Gazipur",
        "Narayanganj", "Tangail", "Kishoreganj", "Manikganj", "Munshiganj", "Faridpur", "Madaripur", "Shariatpur",
        "Gopalganj", "Bagerhat", "Satkhira", "Jashore", "Jhenaidah", "Magura", "Narail", "Kushtia", "Chuadanga", "Meherpur",
        "Bogura", "Joypurhat", "Naogaon", "Natore", "Chapainawabganj", "Pabna", "Sirajganj", "Jamalpur", "Netrokona", "Sherpur",
        "Habiganj", "Moulvibazar", "Sunamganj", "Patuakhali", "Pirojpur", "Bhola", "Jhalokathi", "Barguna", "Dinajpur", "Gaibandha",
        "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Thakurgaon"
    ];

    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const [product, setProduct] = useState(null);
    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();
    const selectedDistrict = watch("district");
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const [quantities, setQuantities] = useState(1);
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    useEffect(() => {
        setDeliveryCharge(selectedDistrict === "Dhaka" ? 50 : 120);
    }, [selectedDistrict]);

    useEffect(() => {
        if (product?._id) {
            setQuantities(prev => ({
                ...prev,
                [product._id]: 1
            }));
        }
    }, [product]);

    const totalProductPrice = product?.price * quantities[product?._id];

    const totalCashOnDelivery = totalProductPrice + deliveryCharge;

    const handleQuantityChange = (id, value) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max(1, value)
        }));
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axiosPublic.get(`/products/${id}`);
                setProduct(response.data);
                // console.log(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id, axiosPublic]);

    const onSubmit = async (data) => {

        const orderItems = [
            {
                productId: product?._id,
                quantity: quantities[product?._id] || 1,
            }
        ];

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


        console.log(typeof orderData.items)

        try {
            const response = await axiosSecure.post("/orders", orderData);
            if (response.status === 200) {
                Swal.fire("Success", "Your order has been confirmed!", "success");
                reset();

            }
        } catch (error) {
            Swal.fire("Error", "Failed to place order. Try again!", "error");
        }
    };



    return (
        <div className='max-w-3xl mx-auto p-4'>

            <Helmet>
                <title>Noorify | Order Page</title>
            </Helmet>

            <div>
                <p className='font-medium text-white text-3xl text-center py-5 md:pb-10'>Place Your Order</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="rounded bg-white">
                    <div key={product?._id} className="border-b-2 border-black last:border-none p-3 flex justify-between products-center">
                        <div className="flex-1 flex flex-col gap-2">
                            <p className="font-semibold line-clamp-2">{product?.productName}</p>
                            <p className="font-medium">
                                Price: {product?.price} BDT
                            </p>
                            <p className="text-sm font-medium">
                                {`${product?.price} * ${quantities[product?._id]} = ${product?.price * quantities[product?._id]} BDT`}
                            </p>
                            <div className="flex products-center">
                                <button type="button"
                                    onClick={() => handleQuantityChange(product?._id, quantities[product?._id] - 1)}
                                    className="p-2 border rounded">
                                    <AiOutlineMinus />
                                </button>
                                <input
                                    type="number"
                                    value={quantities[product?._id]}
                                    min={1}
                                    onChange={(e) => handleQuantityChange(product?._id, Number(e.target.value))}
                                    className="w-16 p-1 border rounded mx-2 text-center"
                                />
                                <button type="button" onClick={() => handleQuantityChange(product?._id, quantities[product?._id] + 1)} className="p-2 border rounded">
                                    <AiOutlinePlus />
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                            <img className="w-20" src={product?.image} alt="" />
                        </div>
                    </div>
                </div>

                <div className="bg-white my-3 p-3 products-center md:products-start rounded flex flex-col gap-3 items-center md:items-start">
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

                <button type="submit" className="bg-[#013a2c] border-2 border-white font-medium text-white p-3 my-5 hover:bg-white hover:text-[#013a2c]  rounded w-full">
                    Order Confirmed
                </button>
            </form>

        </div>
    );
};

export default BuyNowPage;