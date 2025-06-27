import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../../Hooks/useAdmin/useAdmin';
import useAuth from '../../Hooks/UseAuth/useAuth';

const AdminRoute = ({children}) => {

    const {user, loading} = useAuth();
    const  [isAdmin, isAdminLoading] = useAdmin();

    const location = useLocation();

    if(loading || isAdminLoading){
        return <div className='h-screen w-full flex justify-center items-center'>
            <span className="loading loading-dots loading-lg"></span>
        </div>
    }

    if(user && isAdmin){
        return children;
    }

    return <Navigate state={{ from: location }} replace />;
};

export default AdminRoute;