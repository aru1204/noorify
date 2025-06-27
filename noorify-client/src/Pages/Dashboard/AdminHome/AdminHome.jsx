import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import useAllQuestions from '../../../Hooks/useAllQuestions/useAllQuestions';
import { Link } from 'react-router-dom';
import { FaBook, FaQuestion, FaUsersCog } from 'react-icons/fa';
import { RiQuestionAnswerLine } from 'react-icons/ri';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/UseAxioxSecure/useAxiosSecure';
import useAllVideos from '../../../Hooks/useVideos/useAllVideos';
import { MdVideoSettings } from 'react-icons/md';

const AdminHome = () => {

    // Questions management 

    const [allQuestions, refetch] = useAllQuestions();
    const [unansweredQuestions, setUnansweredQuestions] = useState([]);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);

    useEffect(() => {
        if (allQuestions?.length > 0) {
            const filteredUnanswered = allQuestions.filter(q => !q.answer );
            setUnansweredQuestions(filteredUnanswered);
        }
    }, [allQuestions]);

    useEffect(() => {
        if (allQuestions?.length > 0) {
            const filteredAnswered = allQuestions.filter(q => q.answer );
            setAnsweredQuestions(filteredAnswered);
        }
    }, [allQuestions]);

    // User Management 

    const axiosSecure = useAxiosSecure();

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        }
    });

    // Videos management 

    const [videos] = useAllVideos();


    return (
        <div>
            <Helmet>
                <title>BrandZ | Admin | Home</title>
            </Helmet>

            <div>
                <p className='font-medium text-3xl text-center pb-10 text-white'>Admin Home</p>
                {/* <div className="flex w-full flex-col">
                    <div className="divider divider-neutral"></div>
                </div> */}
            </div>

            <div className='flex flex-col md:flex-row gap-5 justify-between'>
                <Link to={"/dashboard/total-manage-questions"} className='bg-white items-center flex gap-2 md:gap-3 p-3 md:p-5 rounded-xl text-base md:text-xl font-medium'>
                    <FaBook />
                    <p>Total Questions ({allQuestions?.length})</p>
                </Link>
                <Link to={"/dashboard/manage-questions-with-answers"} className='bg-white items-center flex gap-2 md:gap-3 p-3 md:p-5 rounded-xl text-base md:text-xl font-medium'>
                    <RiQuestionAnswerLine />
                    <p>Answered Questions ({answeredQuestions?.length})</p>
                </Link>
                <Link to={"/dashboard/manage-questions-without-answers"} className='bg-white items-center flex gap-2 md:gap-3 p-3 md:p-5 rounded-xl text-base md:text-xl font-medium'>
                    <FaQuestion />
                    <p>Unanswered Questions ({unansweredQuestions?.length})</p>
                </Link>
            </div>

            <div className='bg-white rounded-xl p-5 mt-5 flex flex-col md:flex-row justify-between items-center gap-5'>
                <p className='text-base md:text-xl font-medium'>Total Videos = {videos?.length}</p>
                <Link to={"/dashboard/manage-videos"} className='bg-white items-center flex gap-2 md:gap-3 px-5 py-2 rounded-xl border-2 border-[#013a2c] text-base md:text-xl font-medium'>
                    <MdVideoSettings />
                    <p>Manage all videos</p>
                </Link>
            </div>

            <div className='bg-white rounded-xl p-5 mt-5 flex flex-col md:flex-row justify-between items-center gap-5'>
                <p className='text-base md:text-xl font-medium'>Total Users = {users?.length}</p>
                <Link to={"/dashboard/all-user"} className='bg-white items-center flex gap-2 md:gap-3 px-5 py-2 rounded-xl border-2 border-[#013a2c] text-base md:text-xl font-medium'>
                    <FaUsersCog />
                    <p>Manage all users</p>
                </Link>
            </div>


        </div>
    );
};

export default AdminHome;