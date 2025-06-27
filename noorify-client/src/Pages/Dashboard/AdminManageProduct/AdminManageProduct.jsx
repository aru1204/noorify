import React from 'react';
import useProducts from '../../../Hooks/useProducts/useProducts';
import { FaTrash } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/UseAxioxSecure/useAxiosSecure';
import { Helmet } from 'react-helmet';

const AdminManageProduct = () => {

    const [products, refetch] = useProducts();
    const axiosSecure = useAxiosSecure();

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this product!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async(result) => {
            if (result.isConfirmed) {

                const res = await axiosSecure.delete(`/products/${id}`);
                
                if(res.data.deletedCount > 0){
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Product deleted successfully",
                        icon: "success"
                    });
                }
            }
        });
    }

    return (
        <div>
            <Helmet>
                <title>Noorify | Admin | Manage Products</title>
            </Helmet>

            <div>
                <p className='font-medium text-white text-3xl text-center'>Manage Products</p>
                <p className='font-medium text-white text-3xl text-center pb-10'>Total ( {products.length} )</p>
                
            </div>

            <div className='bg-white rounded-lg p-2'>
                {
                    products.map((product, index) =>
                        <div key={index}>
                            <table className='table bg-white'>
                                <tbody>
                                    {/* row 1 */}
                                    <tr>
                                        <th
                                            className='text-base text-center'>
                                            {index + 1}
                                        </th>
                                        <td>
                                            <div className='w-20 h-20 flex justify-center'>
                                                <img className='h-full' src={product.image} alt="" />
                                            </div>
                                        </td>
                                        <td
                                            className=' text-center text-base font-medium'>
                                            <div className='flex flex-col justify-start items-start gap-2'>
                                                <p>Brand: {product?.brand}</p>
                                                <p>Price: {product?.price} Tk</p>
                                            </div>
                                        </td>
                                        <td
                                            className='font-medium text-base text-center'>
                                            <div className='flex flex-col justify-start items-start gap-2'>
                                                <p>Section: {product.section}</p>
                                                <p>Outfits: {product.outfits}</p>
                                            </div>
                                        </td>
                                        <td
                                            className='font-medium text-base text-center'>
                                            <div>
                                                <p>Category: {product.category}</p>
                                            </div>
                                        </td>
                                        <td
                                            className='text-2xl text-center'>
                                            <Link to={`/dashboard/update-products/${product._id}`}>
                                            <button className='flex flex-col items-center'>
                                                <FaEdit />
                                                <span className='text-sm'>edit</span>
                                            </button>
                                            </Link>
                                        </td>
                                        <td className='text-2xl text-center'>
                                            <button onClick={() => handleDelete(product?._id)} className='flex flex-col items-center'>
                                                <FaTrash className='text-red-600' />
                                                <span className='text-sm'>delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default AdminManageProduct;