import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../Hooks/UseAuth/useAuth';

const PrivateRoute = ({children}) => {

    const {user, loading} = useAuth();

    const location = useLocation();

    if(loading){
        return <div className='h-screen w-full flex justify-center items-center'>
            <span className="loading loading-dots loading-lg"></span>
        </div>
    }

    if(user){
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;