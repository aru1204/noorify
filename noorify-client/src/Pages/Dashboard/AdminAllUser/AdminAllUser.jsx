import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaTrash, FaUserCog } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/UseAxioxSecure/useAxiosSecure';
import { Helmet } from 'react-helmet';


const AdminAllUser = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        }
    });


    const handleUserRole = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to make this person Admin!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${id}`)
                    .then(() => {
                        refetch();
                        Swal.fire("Success", "Now this person is Admin", "success");
                    });
            }
        });
    };

    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this user!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(() => {

                        if (user.uid) {
                            axiosSecure.delete(`/users/googleDelete/${user.uid}`)
                                .then(res => {
                                })
                                .catch(error => {
                                })
                        }

                        refetch();
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "User deleted successfully.",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
                    .catch(error => {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Something worgn. try again later",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })

            }
            // else {
            //     Swal.fire({
            //         position: "center",
            //         icon: "error",
            //         title: "Something worgn. try again later",
            //         showConfirmButton: false,
            //         timer: 1500
            //     });
            // }
        });
    };

    return (
        <div>
            <Helmet>
                <title>Noorify | Admin | All Users</title>
            </Helmet>

            <p className='font-medium text-white text-3xl text-center pb-10'>All Users ({users.length})</p>

            <div className="overflow-x-auto">
                <table className="table bg-white">
                    <thead className='bg-[#013a2c]'>
                        <tr>
                            <th className='text-xl text-white text-center'>No</th>
                            <th className='text-xl text-white text-center'>Name</th>
                            <th className='text-xl text-white text-center'>Email</th>
                            <th className='text-xl text-white text-center'>Mobile</th>
                            <th className='text-xl text-white text-center'>Role</th>
                            <th className='text-xl text-white text-center'>Delete User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user?._id || index}>
                                <th className="text-base text-center">{index + 1}</th>
                                <td className="uppercase text-center text-base font-medium">
                                    {typeof user?.name === "string"
                                        ? user.name
                                        : user?.name?.firstName + " " + user?.name?.lastName || "Invalid Name"}
                                </td>
                                <td className="font-medium text-base text-center">
                                    {user?.email || "No Email"}
                                </td>
                                <td className="font-medium text-base text-center">
                                    {user?.mobile || "No Mobile"}
                                </td>
                                <td className="text-xl text-center">
                                    {user?.role === "admin" ? (
                                        "Admin"
                                    ) : (
                                        <button onClick={() => handleUserRole(user?._id)}>
                                            <FaUserCog className="text-[#003557]" />
                                        </button>
                                    )}
                                </td>
                                <td className="text-xl text-center">
                                    {user?.role === "admin" ? (
                                        "Admin"
                                    ) : (
                                        <button onClick={() => handleDeleteUser(user)}>
                                            <FaTrash className="text-red-600" />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default AdminAllUser;