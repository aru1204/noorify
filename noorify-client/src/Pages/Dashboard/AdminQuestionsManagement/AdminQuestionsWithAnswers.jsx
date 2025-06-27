import React, { useEffect, useState } from 'react';
import useAllQuestions from '../../../Hooks/useAllQuestions/useAllQuestions';
import { Helmet } from 'react-helmet';
import AdminQuestionCard from './AdminQuestionCard';

const AdminQuestionsWithAnswers = () => {

    const [allQuestions, refetch] = useAllQuestions();
    const [answeredQuestions, setAnsweredQuestions] = useState([]);

    useEffect(() => {
        if (allQuestions?.length > 0) {
            const filteredAnswered = allQuestions.filter(q => q.answer );
            setAnsweredQuestions(filteredAnswered);
        }
    }, [allQuestions]);

    return (
        <div>
            <Helmet>
                <title>Noorify | Admin | Answered questions</title>
            </Helmet>

            <div>
                <p className="font-medium text-white text-3xl text-center pb-10">Answered questions ({answeredQuestions?.length})</p>
            </div>

            <div className=''>
                {
                    answeredQuestions.map(singleQuestions => 
                    <AdminQuestionCard key={singleQuestions._id} singleQuestions={singleQuestions}></AdminQuestionCard>)
                }
            </div>
        </div>
    );
};

export default AdminQuestionsWithAnswers;