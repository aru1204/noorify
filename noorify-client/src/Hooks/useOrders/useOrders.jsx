import useAxiosSecure from '../UseAxioxSecure/UseAxiosSecure';
import useAuth from '../UseAuth/useAuth';
import { useQuery } from '@tanstack/react-query';

const useOrders = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const {refetch, data: orders = []} = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?email=${user?.email}`);
            return res.data;
        }
    })
    return [orders, refetch]

};

export default useOrders;