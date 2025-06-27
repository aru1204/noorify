import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import useAllQuestions from '../../../Hooks/useAllQuestions/useAllQuestions';
import AdminQuestionCard from './AdminQuestionCard';

const AdminQuestionsWithoutAnswers = () => {

    const [allQuestions, refetch] = useAllQuestions();
    const [unansweredQuestions, setUnansweredQuestions] = useState([]);

    useEffect(() => {
        if (allQuestions?.length > 0) {
            const filteredUnanswered = allQuestions.filter(q => !q.answer );
            setUnansweredQuestions(filteredUnanswered);
        }
    }, [allQuestions]);

    return (
        <div>
            <Helmet>
                <title>Noorify | Admin | Unanswered questions</title>
            </Helmet>

            <div>
                <p className="font-medium text-white text-3xl text-center pb-10">Unanswered questions ({unansweredQuestions?.length})</p>
            </div>

            <div className=''>
                {
                    unansweredQuestions.map(singleQuestions => 
                    <AdminQuestionCard key={singleQuestions._id} singleQuestions={singleQuestions}></AdminQuestionCard>)
                }
            </div>
        </div>
    );
};

export default AdminQuestionsWithoutAnswers;