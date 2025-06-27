import React from 'react';
import useAxiosSecure from '../UseAxioxSecure/useAxiosSecure';
import useAuth from '../UseAuth/useAuth';
import { useQuery } from '@tanstack/react-query';

const useAllOrders = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const {refetch, data: allOrders = []} = useQuery({
        queryKey: ['allOrders', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-orders`);
            return res.data;
        }
    })
    return [allOrders, refetch]
};

export default useAllOrders;