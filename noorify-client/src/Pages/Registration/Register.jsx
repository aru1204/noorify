import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Controller, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProviders/AuthProvider';
import Swal from 'sweetalert2';
import GoogleLogin from '../../Shared/SocialLogin/GoogleLogin';
import useAxiosPublic from '../../Hooks/useAxiosPublic/useAxiosPublic';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Register = () => {

    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors }, control } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(result => {
                
                const uid = result.user.uid;

                updateUserProfile(data.name)
                    .then(() => {

                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            mobile: data.mobile,
                            // dateOfBirth: data.dob,
                            uid: uid,
                        }

                        axiosPublic.post("/users", userInfo)
                            .then(res => {
                                if (res.data.insertedId) {

                                    const userInfo = { email: data.email };
                                    axiosPublic.post("/jwt", userInfo, { withCredentials: true })
                                        .then(res => {

                                            reset();
                                            Swal.fire({
                                                position: "center",
                                                icon: "success",
                                                title: "Register Successfully",
                                                showConfirmButton: false,
                                                timer: 1500
                                            });
                                            navigate(from, { replace: true })
                                        })
                                }
                            })

                    })
                    .catch(error => {

                    })
            })
            .catch(error => {
                if (error.code === "auth/email-already-in-use") {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Email already in use",
                        text: "Please use a different email address.",
                        showConfirmButton: true,
                    });
                } else {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Registration failed",
                        text: error.message,
                        showConfirmButton: true,
                    });
                }
            })

    };



    return (
        <div>

            <Helmet>
                <title>Noorify | Register</title>
            </Helmet>

            <div className="hero mt-5">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="text-center pt-8">
                            <h1 className="text-3xl font-bold">Register now!</h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body pb-0">

                            {/* Name Field  */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("name", { required: true })}
                                    placeholder="name"
                                    className="input input-bordered" />
                                {errors.name && <span className='text-red-500 pt-2'>This field is required</span>}
                            </div>

                            {/* Email Field  */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    {...register("email", { required: true })}
                                    placeholder="email"
                                    className="input input-bordered" />
                                {errors.email && <span className='text-red-500 pt-2'>This field is required</span>}
                            </div>

                            {/* Mobile Field  */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Mobile Number</span>
                                </label>
                                <input
                                    type='text'
                                    {...register("mobile", { required: true })}
                                    placeholder="mobile"
                                    className="input input-bordered" />
                                {errors.mobile && <span className='text-red-500 pt-2'>This field is required</span>}
                            </div>

                            {/* Date of Birth  */}

                            {/* <div>
                                <label className="label">
                                    <span className="label-text">Date of Birth ( DD/MM/YYYY )</span>
                                </label>
                                <Controller
                                    name="dob" // Field name
                                    control={control} // Provided by useForm
                                    defaultValue={null} // Default value for the date picker
                                    rules={{ required: "Date of Birth is required" }} // Validation rules
                                    render={({ field }) => (
                                        <DatePicker
                                            placeholderText="Select your date of birth"
                                            selected={field.value} // Value from react-hook-form
                                            onChange={(date) => field.onChange(date)} // Update form state
                                            dateFormat="dd/MM/yyyy"
                                            className="input input-bordered" // Optional styling
                                        />
                                    )}
                                />
                                {errors.dob && <p className="text-red-500 pt-2">{errors.dob.message}</p>}
                            </div> */}

                            {/* Password Field  */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    {...register("password", {
                                        required: true,
                                        maxLength: 20,
                                        // pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
                                        minLength: 6
                                    })}
                                    placeholder="password"
                                    className="input input-bordered" />
                                {errors.password?.type === 'required' && <span className='text-red-500 pt-2'>This field is required</span>}
                                {errors.password?.type === 'pattern' && <span className='text-red-500 pt-2'>Password should have must One Uppercase, One Lowercase, One Number and One Special Character</span>}
                                {errors.password?.type === 'maxLength' && <span className='text-red-500 pt-2'>Password maximum length is 20 character</span>}
                                {errors.password?.type === 'minLength' && <span className='text-red-500 pt-2'>Password minimum length is 6 character</span>}
                            </div>

                            {/* Button */}
                            <div className="form-control mt-6">
                                <button
                                    className="py-2 rounded-lg border-2 hover:border-2 border-[#013a2c] hover:bg-white hover:text-[#013a2c] bg-[#013a2c] text-white font-semibold">Register</button>
                            </div>
                        </form>

                        <div className='px-8 pb-8'>
                            {/* Google Register Button */}
                            <GoogleLogin></GoogleLogin>

                            <div className='mt-2 flex flex-col gap-2 items-center'>
                                <p>Have an Account ?</p>
                                <Link to={"/login"} className='font-semibold underline'>Login</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;