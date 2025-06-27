import { useQuery } from "@tanstack/react-query";
import useAuth from "../UseAuth/useAuth";
import useAxiosSecure from "../UseAxioxSecure/UseAxiosSecure";

const useCarts = () => {

    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const {refetch, data: carts = []} = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user?.email}`);
            return res.data;
        }
    })
    return [carts, refetch]
};

export default useCarts;