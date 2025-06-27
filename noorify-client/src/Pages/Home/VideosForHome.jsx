import React, { useEffect, useState } from 'react';
import useAllVideos from '../../Hooks/useVideos/useAllVideos';
import VideoCard from '../Dashboard/ManageVideos/videoCard';
import { Link } from 'react-router-dom';


const VideosForHome = () => {
    // const [videos, refetch] = useAllVideos();
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetch("https://noorify-server.vercel.app/two-videos")
            .then(res => res.json())
            .then(data => setVideos(data));
    }, []);
    

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
        <div className='flex flex-col justify-center items-center'>

            {/* <div className='mt-20 mb-5 w-60 border-2 border-white border-dashed'></div> */}

            <div>
                <h1 className='md:mt-20 mt-10 text-2xl text-white font-semibold text-center '>Videos</h1>
            </div>

            <div className='max-w-7xl mx-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-5'>
                {
                    videos.map((singleVideo) => (
                        <div key={singleVideo?._id} className='bg-white rounded-xl p-5'>
                            <VideoCard singleVideo={singleVideo} />
                            <p className='pt-5 max-w-[500px] text-center'>{singleVideo?.title}</p>
                            <p className='pt-5 max-w-[500px] text-center'> Posted on : {singleVideo?.publishTime}</p>
                        </div>
                    ))
                }
            </div>
            <Link to={'/all-videos'} className='py-1 px-10 bg-[#013a2c] text-white rounded-md border-2 border-white font-medium mx-auto'>More vidoes</Link>

        </div>
    );
};

export default VideosForHome;
