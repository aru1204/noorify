import axios from "axios";
import { useEffect } from "react";
import useAuth from "../UseAuth/useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: "https://noorify-server.vercel.app",
    withCredentials: true
})
  
const useAxiosSecure = () => {

    const { logoutUser } = useAuth();
    const navigate = useNavigate();

    useEffect( () => {
        axiosSecure.interceptors.response.use(response => {
            return response;
        } , async (error) => {
            const status = error.response.status;
            if(status === 401 || status === 403){
                await logoutUser();
                navigate('/login');
            }
            return Promise.reject(error)
        } )
    }, [])

    return axiosSecure;
};

export default useAxiosSecure;