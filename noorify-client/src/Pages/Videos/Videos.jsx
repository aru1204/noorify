import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import useAllVideos from '../../Hooks/useVideos/useAllVideos';
import VideoCard from '../Dashboard/ManageVideos/videoCard';

const Videos = () => {

    const [videos, refetch] = useAllVideos();

    // Load Facebook SDK once when component mounts
    useEffect(() => {
        if (!window.FB) {
            const script = document.createElement('script');
            script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v17.0";
            script.async = true;
            script.defer = true;
            script.crossOrigin = "anonymous";
            document.body.appendChild(script);
        }
    }, [videos]);

    return (
        <div>
            <Helmet>
                <title>Noorify | All Videos</title>
            </Helmet>
            <div>
                <h1 className='text-2xl text-white font-semibold text-center my-5 md:my-10'>All Videos ({videos.length})</h1>
            </div>

            <div>
                <div className='max-w-7xl mx-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-5 items-center justify-center px-3'>
                    {
                        videos.map((singleVideo) => (
                            <div key={singleVideo?._id} className='bg-white rounded-xl p-5'>
                                <VideoCard singleVideo={singleVideo} />
                                <p className='pt-5 max-w-[500px] text-center mx-auto'>{singleVideo?.title}</p>
                                <p className='pt-5 max-w-[500px] text-center mx-auto'>Posted on : {singleVideo?.publishTime}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Videos;