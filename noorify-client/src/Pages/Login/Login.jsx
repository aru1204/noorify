import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProviders/AuthProvider';
import Swal from 'sweetalert2';
import GoogleLogin from '../../Shared/SocialLogin/GoogleLogin';
import useAxiosPublic from '../../Hooks/useAxiosPublic/useAxiosPublic';

const Login = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();

    const from = location.state?.from?.pathname || "/";

    const onSubmit = data => {
        loginUser(data.email, data.password)
            .then(result => {
                reset()
                const userInfo = { email: data.email };
                axiosPublic.post("/jwt", userInfo, { withCredentials: true })
                .then(res => {
                })
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Login Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });

                navigate(from, {replace: true})
            })
            .catch(error => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Please provide correct data",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    };


    return (
        <div>

            <Helmet>
                <title>Noorify | Login</title>
            </Helmet>

            <div className="hero my-5">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="text-center pt-8">
                            <h1 className="text-3xl font-bold">Login now!</h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body pb-0">

                            {/* Email Field  */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name='email'
                                    {...register("email", { required: true })}
                                    placeholder="email"
                                    className="input input-bordered" />
                                {errors.email && <span className='text-red-500 pt-2'>This field is required</span>}
                            </div>

                            {/* Password Field  */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name='password'
                                    {...register("password", { required: true })}
                                    placeholder="password"
                                    className="input input-bordered" />
                                {errors.password && <span className='text-red-500 pt-2'>This field is required</span>}
                            </div>

                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>

                            {/* Button */}
                            <div className="form-control mt-6">
                                <button className="py-2 rounded-lg border-2 hover:border-2 border-[#013a2c] hover:bg-white hover:text-[#013a2c] bg-[#013a2c] text-white font-semibold">Login</button>
                            </div>
                        </form>

                        <div className='px-8 pb-8'>
                            {/* Google Register Button */}
                            <GoogleLogin></GoogleLogin>

                            <div className='mt-2 flex flex-col gap-2 items-center'>
                                <p>Have an Account ?</p>
                                <Link to={"/register"} className='font-semibold underline'>Register</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;