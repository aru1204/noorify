import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/UseAxioxSecure/useAxiosSecure';
import useAllOrders from '../../../Hooks/useAllOrders/useAllOrders';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AdminOrdersCard = ({ order }) => {

    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const axiosSecure = useAxiosSecure();
    const [allOrders, refetch] = useAllOrders();

    const handleStatusChange = async (orderId, status) => {

        try {
            const response = await axiosSecure.patch("/orders", {
                orderId,
                status
            });

            setPopupVisible(false);
            refetch();
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update order status");
        }

    };

    // Open the popup and set the selected order ID
    const openPopup = (orderId) => {
        setSelectedOrderId(orderId);
        setPopupVisible(true);
    };

    const handleDeleteOrder = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this order!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/orders/${id}`)
                    .then(res => {
                        refetch()
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Order has been deleted.",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
            }
        });
    }

    return (
        <div>
            <div key={order._id} className="bg-white shadow-lg rounded-lg p-4 space-y-2">
                <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
                <button >
                    <p
                        className={`px-4 py-2 my-3 flex gap-3 items-center rounded font-medium ${order.status === "Confirmed"
                            ? "bg-green-500 text-white"
                            : order.status === "Processing"
                                ? "bg-blue-500 text-white"
                                : order.status === "Delivered"
                                    ? "bg-[#013a2c] text-white"
                                    : "bg-gray-400 text-black"
                            }`}
                        onClick={() => openPopup(order?._id)}
                    >Order status: {order.status}
                        <FaEdit />
                    </p>
                </button>
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
                <button
                    className='flex items-center justify-center py-1 w-full'
                    onClick={() => handleDeleteOrder(order._id)}
                >
                    <FaTrash className="text-red-600 text-xl" />
                </button>
            </div>

            {/* Popup */}
            {popupVisible && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={() => setPopupVisible(false)} // Close popup
                >
                    <div
                        className="bg-white p-5 rounded-lg space-y-4"
                        onClick={(e) => e.stopPropagation()} // Prevent closing on popup click
                    >
                        <h4 className="font-bold text-lg">Change Order Status</h4>
                        <div className="flex gap-4 flex-col md:flex-row">
                            <button
                                className="bg-green-500 font-medium text-white px-4 py-2 rounded"
                                onClick={() => handleStatusChange(selectedOrderId, "Confirmed")}
                            >
                                Confirmed
                            </button>
                            <button
                                className="bg-blue-500 font-medium text-white px-4 py-2 rounded"
                                onClick={() => handleStatusChange(selectedOrderId, "Processing")}
                            >
                                Processing
                            </button>
                            <button
                                className="bg-[#013a2c] font-medium text-white px-4 py-2 rounded"
                                onClick={() => handleStatusChange(selectedOrderId, "Delivered")}
                            >
                                Delivered
                            </button>
                        </div>
                        <button
                            className="text-red-500 font-bold"
                            onClick={() => setPopupVisible(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrdersCard;