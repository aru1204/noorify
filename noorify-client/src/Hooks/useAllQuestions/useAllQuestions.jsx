import { useQuery } from "@tanstack/react-query";
import useAuth from "../UseAuth/useAuth";
import useAxiosSecure from "../UseAxioxSecure/useAxiosSecure";

const useAllQuestions = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const {refetch, data: allQuestions = []} = useQuery({
        queryKey: ['questions', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-questions`);
            return res.data;
        }
    })
    return [allQuestions, refetch]
};

export default useAllQuestions;