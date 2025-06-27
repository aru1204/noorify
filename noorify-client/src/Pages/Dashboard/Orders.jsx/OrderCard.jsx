import React from "react";
import { IoCall } from "react-icons/io5";
import { Link } from "react-router-dom";

const OrderCard = ({ orders }) => {
    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold text-center text-white mb-4">Your Orders</h2>
            {orders.length === 0 ? (
                <>
                    <div className='bg-white flex flex-col items-center justify-center space-y-5 py-5 rounded-md'>
                        <p className='text-2xl text-center font-medium'>You don't have any Orders</p>
                        <Link to={"/products"} className='py-1 px-5 bg-[#013a2c] text-white rounded-lg'>Browse Products</Link>
                    </div>
                </>
            ) : (
                <>
                    <div className='bg-white flex flex-col items-center justify-center space-y-5 p-3 rounded-md mb-5'>
                        <p className='text-2xl text-center font-medium'>Please Call us if you cancel any order</p>
                        <Link to={"tel:+8801728512273"}>
                            <button className='hover:bg-[#013a2c] rounded-md hover:text-white py-3 px-6 border-2 border-[#013a2c] text-[15px] font-medium text-[#013a2c] box-shadow flex items-center gap-5'>Direct Call<IoCall /></button>
                        </Link>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white shadow-lg rounded-lg space-y-2 p-4">
                                <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
                                <p className={`px-4 py-2 my-3 rounded font-medium ${order.status === "Confirmed"
                                    ? "bg-green-500 text-white"
                                    : order.status === "Processing"
                                        ? "bg-blue-500 text-white"
                                        : order.status === "Delivered"
                                            ? "bg-[#013a2c] text-white"
                                            : "bg-gray-400 text-black"
                                    }`}>Order status: {order.status}</p>
                                <p className="text-gray-600">Delivery Charge: {order.deliveryCharge} Tk</p>
                                <p className="font-medium text-lg">Total COD: {order.totalAmount} Tk</p>
                                <p className="text-gray-600">Delivery Address: {order.address}, {order.district}</p>
                                <p className="text-gray-600">Name: {order.name}</p>
                                <p className="text-gray-600">Email: {order.email}</p>
                                <p className="text-gray-600">Mobile: {order.mobile}</p>
                                <p className="text-gray-600">Order Date: {order.orderDate}</p>
                                <h4 className="text-md font-semibold mt-3">Items:</h4>
                                <div className="space-y-2 mt-2">
                                    {order.items.map((item) => (
                                        <div
                                            key={item.productId}
                                            className="border p-2 rounded-lg flex items-center space-x-3"
                                        >
                                            <img
                                                src={item.productDetails.image}
                                                alt={item.productDetails.productName}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <div>
                                                <p className="font-medium">{item.productDetails.productName}</p>
                                                <p className="text-gray-500">Unit Price: {item.productDetails.price}</p>
                                                <p className="text-gray-500">Quantity: {item.quantity}</p>
                                                <p className="text-gray-500">Total: {item.quantity * item.productDetails.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default OrderCard;
