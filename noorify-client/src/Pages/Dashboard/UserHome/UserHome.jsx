import React, { useEffect, useState } from 'react';
import useFavourite from '../../../Hooks/UseFavourites/useFavourite';
import useAuth from '../../../Hooks/UseAuth/useAuth';
import { Link } from 'react-router-dom';
import useQuestions from '../../../Hooks/useQuestions/useQuestions';
import { FaBook, FaQuestion } from 'react-icons/fa';
import { RiQuestionAnswerLine } from 'react-icons/ri';

const UserHome = () => {

    const [favourite] = useFavourite();
    const { user } = useAuth();

    const [questions, refetch] = useQuestions();
    const [unansweredQuestions, setUnansweredQuestions] = useState([]);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);

    useEffect(() => {
        if (questions?.length > 0) {
            const filteredUnanswered = questions.filter(q => !q.answer || q.answer.trim() === "");
            setUnansweredQuestions(filteredUnanswered);
        }
    }, [questions]);

    useEffect(() => {
        if (questions?.length > 0) {
            const filteredAnswered = questions.filter(q => q.answer && q.answer.trim() !== "");
            setAnsweredQuestions(filteredAnswered);
        }
    }, [questions]);

    return (
        <div>
            <div>
                <p className='font-medium text-white text-3xl text-center pb-5 md:pb-10'>Home</p>
            </div>
            <div className='flex flex-col md:flex-row gap-5 justify-between'>
                <Link to={"/dashboard/total-questions"} className='bg-white items-center flex gap-2 md:gap-3 p-3 md:p-5 rounded-xl text-base md:text-xl font-medium'>
                    <FaBook />
                    <p>Total Questions ({questions?.length})</p>
                </Link>
                <Link to={"/dashboard/questions-with-answers"} className='bg-white items-center flex gap-2 md:gap-3 p-3 md:p-5 rounded-xl text-base md:text-xl font-medium'>
                    <RiQuestionAnswerLine />
                    <p>Answered Questions ({answeredQuestions?.length})</p>
                </Link>
                <Link to={"/dashboard/questions-without-answers"} className='bg-white items-center flex gap-2 md:gap-3 p-3 md:p-5 rounded-xl text-base md:text-xl font-medium'>
                    <FaQuestion />
                    <p>Unanswered Questions ({unansweredQuestions?.length})</p>
                </Link>
            </div>
            {/* <div className='bg-white md:flex-row gap-5 flex-col items-center rounded-lg p-5 flex md:justify-between flex-wrap'>
                <p className='md:text-xl text-base font-medium'>Your total favourite products is ({favourite.length})</p>
                <div className='flex gap-5'>
                    <Link to={"/dashboard/favourite"} className='border-2 border-[#003557] font-medium rounded-lg px-5 py-1'>View</Link>
                    <Link to={"/"} className='border-2 border-[#003557] font-medium rounded-lg px-5 py-1'>Add</Link>
                </div>
            </div> */}
            <div className='bg-white flex rounded-lg flex-wrap p-5  justify-center gap-10 mt-5'>
                <div className='flex-wrap text-lg flex items-center justify-center gap-5 '>
                    <p><span className='font-medium'>Name :</span> {user.displayName}</p>
                    <p><span className='font-medium'>Email :</span> {user.email}</p>
                    <p className='text-center'><span className='font-medium'>Last Login</span> {user.metadata.lastSignInTime}</p>
                </div>
                <div>
                    <Link to={"/dashboard/profile"} className='border-2 border-[#003557] font-medium rounded-lg px-5 py-1'>View or Edit</Link>
                </div>
            </div>
        </div>
    );
};

export default UserHome;