import React, { useEffect } from 'react';
import useAllVideos from '../../../Hooks/useVideos/useAllVideos';
import VideoCard from './videoCard';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/UseAxioxSecure/useAxiosSecure';

const AllVideos = () => {
    const [videos, refetch] = useAllVideos();
    const axiosSecure = useAxiosSecure();

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
    }, []);

    const handleTitleChange = async (id) => {
            const { value: text } = await Swal.fire({
                input: "textarea",
                inputLabel: "Changed title",
                confirmButtonColor: "#013a2c",
                cancelButtonColor: "#d33",
                inputPlaceholder: "Type new title ...",
                inputAttributes: {
                    "aria-label": "Type new title"
                },
                showCancelButton: true
            });
    
            if (text) {
                const title = {
                    title: text,
                };
    
                try {
                    const changedTitle = await axiosSecure.patch(`/videos/${id}`, title);
    
                    if (changedTitle.data.modifiedCount > 0) {
                        refetch()
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Title changed successfully",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    } else {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "No changes detected",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Update failed",
                        text: "There was an error submitting the changed title",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            }
        };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't delete this video!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#013a2c",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/videos/${id}`);

                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Video deleted successfully",
                            icon: "success"
                        });
                    } else {
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Something went wrong. Try again later.",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Failed to delete. Check server connection.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });
    }

    return (
        <div className=''>
            <div className='grid grid-cols-1 xl:grid-cols-4 gap-5'>
                {videos.map(singleVideo => (
                    <div className=' bg-white rounded-xl p-5 flex flex-col gap-5'>
                        <VideoCard
                            key={singleVideo?._id} // Added key prop
                            singleVideo={singleVideo} // Correct prop passing
                        />
                        <p className=''>{singleVideo?.title}</p>
                        <p className=''>Posted on : {singleVideo?.publishTime}</p>
                        <div className='flex gap-3 justify-center items-center'>
                            <button onClick={() => handleDelete(singleVideo?._id)} className='py-1 px-3 bg-red-700 rounded-sm text-white font-medium'>Delete Video</button>
                            <button onClick={() => handleTitleChange(singleVideo?._id)} className='py-1 px-3 bg-[#013a2c] rounded-sm text-white font-medium'>Edit Video</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllVideos;