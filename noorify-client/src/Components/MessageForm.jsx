import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosPublic from '../Hooks/useAxiosPublic/useAxiosPublic';
import useAuth from '../Hooks/UseAuth/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

const MessageForm = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const onSubmit = async (data) => {
        if (user && user.email) {
            const questions = {
                email: user?.email,
                question: data?.question,
                questionTime: new Date().toLocaleString() // Adding local date and time
            };

            await axiosPublic.post("/questions", questions)
                .then(() => {
                    reset();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Question submitted successfully",
                        text: "Please wait a moment for the answer.",
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
        <div className="mx-auto p-6 !w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 ">

                {/* Question Field */}
                <div className="form-control">
                    <textarea
                        placeholder='Type your question'
                        id="question"
                        {...register("question", { required: "Question is required" })}
                        className={`textarea textarea-bordered w-full h-40 ${errors.question ? "input-error" : ""}`}
                    ></textarea>
                    {errors.question && <span className="text-white text-sm">{errors.question.message}</span>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-[#013a2c] hover:text-[#013a2c] btn rounded-md text-white font-medium text-lg py-2 w-fit mx-auto"
                >
                    Send Question
                </button>
            </form>
        </div>
    );
};

export default MessageForm;
