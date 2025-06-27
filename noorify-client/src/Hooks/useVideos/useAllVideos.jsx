import useAuth from '../UseAuth/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../useAxiosPublic/useAxiosPublic';

const useAllVideos = () => {
    const axiosPublic = useAxiosPublic();
    const {user} = useAuth();

    const {refetch, data: videos = []} = useQuery({
        queryKey: ['videos', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/videos`);
            return res.data;
        }
    })
    return [videos, refetch]
};

export default useAllVideos;