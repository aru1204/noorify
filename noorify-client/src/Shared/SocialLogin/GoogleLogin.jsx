import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../Providers/AuthProviders/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../Hooks/useAxiosPublic/useAxiosPublic';

const GoogleLogin = () => {

    const { googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();

    const from = location.state?.from?.pathname || "/";

    const handleGoogleLogin = () => {
        googleLogin()
            .then(async(result) => {

                const user = { email: result.user?.email };
                await axiosPublic.post("/jwt", user, { withCredentials: true })
                    .then(res => {
                    })

                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    uid: result.user.uid
                }

                axiosPublic.post("/users", userInfo)
                    .then(res => {

                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Login Successfully",
                            showConfirmButton: false,
                            timer: 2000
                        });

                        navigate(from, { replace: true })
                    })

            }).catch((error) => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Something worng",
                    showConfirmButton: false,
                    timer: 2000
                });
            });
    }

    return (
        <div className="form-control mt-3">
            <button
                onClick={handleGoogleLogin}
                className="flex justify-center items-center gap-3 py-2 rounded-lg border-2 hover:border-2 border-[#013a2c] hover:bg-[#013a2c] hover:text-white bg-white text-[#013a2c] font-semibold">
                <FaGoogle />
                Login With Google</button>
        </div>
    );
};

export default GoogleLogin;