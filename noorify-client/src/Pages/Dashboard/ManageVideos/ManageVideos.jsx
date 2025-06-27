import React from 'react';
import { Helmet } from 'react-helmet';
import { RiVideoAddFill, RiVideoOnFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import useAllVideos from '../../../Hooks/useVideos/useAllVideos';

const ManageVideos = () => {

    const [videos, refetch] = useAllVideos();

    return (
        <div>
            <Helmet>
                <title>Noorify | Admin | Manage Videos</title>
            </Helmet>

            <div>
                <p className="font-medium text-white text-3xl text-center pb-10">Manage Videos</p>
            </div>

            <div className='flex flex-col md:flex-row gap-5 justify-around'>
                <Link to={"/dashboard/all-videos"} className='bg-white items-center flex gap-2 md:gap-3 p-3 md:p-5 rounded-xl text-base md:text-xl font-medium'>
                    <RiVideoOnFill />
                    <p>All Videos ({videos?.length})</p>
                </Link>
                <Link to={"/dashboard/add-videos"} className='bg-white items-center flex gap-2 md:gap-3 p-3 md:p-5 rounded-xl text-base md:text-xl font-medium'>
                    <RiVideoAddFill />
                    <p>Add Videos </p>
                </Link>
            </div>
        </div>
    );
};

export default ManageVideos;