import React from 'react';
import useAuth from '../../../Hooks/UseAuth/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/UseAxioxSecure/useAxiosSecure';
import { Helmet } from 'react-helmet';

const Profile = () => {

    const { user, deleteGoogleUser } = useAuth();
    const { updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();


    const handleNameChange = () => {

        Swal.fire({
            title: "Enter new name",
            input: "text",
            inputPlaceholder: "Type here...",
            showCancelButton: true,
            confirmButtonColor: "#013a2c",
            confirmButtonText: "Submit",
        }).then(async (result) => {
            const name = { name: result.value }
            if (result.isConfirmed) {
                await updateUserProfile(result.value)
                    .then(async () => {
                        // window.location.reload();
                    })
                    .catch(async (error) => {
                        // window.location.reload();
                    })
            }
            await axiosSecure.get(`/users/${user.email}`)
                .then(async (res) => {
                    await axiosSecure.patch(`/users/${res.data._id}`, name)
                        .then(res => {
                            window.location.reload();
                        })
                })
        });
    };

    const handleDeleteUser = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete your account!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#013a2c",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {

                await axiosSecure.get(`/users/${user.email}`)
                    .then(async(res) => {
                        await axiosSecure.delete(`/users/${res.data._id}`)
                            .then(async(res) => {
                                await deleteGoogleUser()
                                    .then(res => {
                                        navigate("/");
                                        Swal.fire({
                                            title: "Deleted!",
                                            text: "Your file has been deleted.",
                                            icon: "success"
                                        });
                                    })
                            })
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
        });
    }

    return (
        <div>
            <Helmet>
                <title>Noorify | Profile</title>
            </Helmet>

            <div>
                <p className='font-medium text-white text-3xl text-center pb-5 md:pb-10'>Profile</p>
            </div>
            <div className='bg-white p-5 rounded-lg space-y-5'>
                <div className='md:text-2xl text-xl font-medium'>
                    Info
                </div>
                <div className='flex gap-2 text-base md:text-lg'>
                    <p className='font-medium'>Name : </p>
                    <div className='flex flex-wrap justify-between gap-3 items-center'>
                        <p>{user.displayName}</p>
                        <Link onClick={handleNameChange}>
                            <FaEdit />
                        </Link>
                    </div>
                </div>
                <div className='flex flex-wrap gap-2 text-base md:text-lg'>
                    <p className='font-medium'>Email : </p> <p>{user.email}</p>
                </div>
                <div className='text-sm'>
                    <p><span className='font-medium'>Last Login</span> {user.metadata.lastSignInTime}</p>
                </div>
            </div>
            <div className='p-5 rounded-lg space-y-5 bg-red-300 mt-5'>
                <div className='md:text-2xl text-xl font-medium'>
                    Danger Zone
                </div>
                <div>
                    <button className='bg-red-600 rounded-lg text-white py-1 px-4' onClick={handleDeleteUser}>
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;