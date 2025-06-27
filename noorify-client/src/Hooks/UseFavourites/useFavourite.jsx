import { useQuery } from "@tanstack/react-query";
import useAuth from "../UseAuth/useAuth";
import useAxiosSecure from "../UseAxioxSecure/useAxiosSecure";

const useFavourite = () => {

    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const {refetch, data: favourite = []} = useQuery({
        queryKey: ['favourite', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/favourites?email=${user.email}`);
            return res.data;
        }
    })
    return [favourite, refetch]
};

export default useFavourite;