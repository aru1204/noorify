import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaBook, FaQuestion } from 'react-icons/fa';
import { RiQuestionAnswerLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import useAllQuestions from '../../../Hooks/useAllQuestions/useAllQuestions';

const AdminQuestionsManagement = () => {

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


    return (
        <div>

            <Helmet>
                <title>Noorify | Admin | Manage Questions</title>
            </Helmet>

            <div>
                <p className="font-medium text-white text-3xl text-center pb-10">Manage Questions</p>
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
        </div>
        
    );
};

export default AdminQuestionsManagement;