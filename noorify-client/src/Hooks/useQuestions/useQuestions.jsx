import useAxiosSecure from '../UseAxioxSecure/useAxiosSecure';
import useAuth from '../UseAuth/useAuth';
import { useQuery } from '@tanstack/react-query';

const useQuestions = () => {

    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    const {refetch, data: questions = []} = useQuery({
        queryKey: ['questions', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/questions?email=${user.email}`);
            return res.data;
        }
    })
    return [questions, refetch]
};

export default useQuestions;