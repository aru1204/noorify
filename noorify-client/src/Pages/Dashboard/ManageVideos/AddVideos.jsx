import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../Hooks/UseAuth/useAuth';
import { Helmet } from 'react-helmet';
import useAxiosSecure from '../../../Hooks/UseAxioxSecure/UseAxiosSecure';

const AddVideos = () => {

    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const onSubmit = async (data) => {
        if (user && user.email) {
            const videos = {
                videoLink: data?.videoLink,
                title: data?.title,
                publishTime: new Date().toLocaleString()
            };

            await axiosSecure.post("/videos", videos)
                .then(() => {
                    reset();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Video submitted successfully",
                        showConfirmButton: false,
                        timer: 3000,
                    });
                })
                .catch(() => {
                    Swal.fire({
                        icon: "error",
                        title: "Submission Failed",
                        text: "Please try again later",
                    });
                });
        } else {
            Swal.fire({
                title: "Please login to ask a question!",
                text: "You need to be logged in to ask a question.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#013a2c",
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
        <div>
            <Helmet>
                <title>Noorify | Admin | Add Videos</title>
            </Helmet>

            <div>
                <p className="font-medium text-white text-3xl text-center pb-10">Add Videos</p>
            </div>

            <div className="mx-auto p-6 !w-full bg-white rounded-xl">
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 ">

                    {/* FB Link Field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Facebook share link of the Video</span>
                        </label>
                        <input
                            placeholder='Type video link'
                            type='url'
                            id="videoLink"
                            {...register("videoLink", { required: "Video link is required" })}
                            className={`input input-bordered w-full ${errors.videoLink ? "input-error" : ""}`}
                        ></input>
                        {errors.videoLink && <span className="text-white text-sm">{errors.videoLink.message}</span>}
                    </div>

                    {/* Title Field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Video title</span>
                        </label>
                        <input
                            placeholder='Type your title'
                            id="title"
                            type='text'
                            {...register("title", { required: "Title is required" })}
                            className={`input input-bordered w-full ${errors.title ? "input-error" : ""}`}
                        ></input>
                        {errors.title && <span className="text-white text-sm">{errors.title.message}</span>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-[#013a2c] hover:text-[#013a2c] btn rounded-md text-white font-medium text-lg py-2 w-fit mx-auto"
                    >
                        Add Video
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddVideos;