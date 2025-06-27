import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProviders/AuthProvider';

const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
};

export default useAuth;