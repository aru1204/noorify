import React, { useEffect, useState } from 'react';
import useQuestions from '../../Hooks/useQuestions/useQuestions';
import { Helmet } from 'react-helmet';
import YourQuestionsCard from './YourQuestionsCard';

const QuestionsWithoutAnswer = () => {

    const [questions, refetch] = useQuestions();
    const [unansweredQuestions, setUnansweredQuestions] = useState([]);

    useEffect(() => {
        if (questions?.length > 0) {
            const filteredUnanswered = questions.filter(q => !q.answer );
            setUnansweredQuestions(filteredUnanswered);
        }
    }, [questions]);

    return (
        <div>
            <Helmet>
                <title>Noorify | Unanswered questions</title>
            </Helmet>

            <div>
                <p className="font-medium text-white text-3xl text-center pb-10">Unanswered questions ({unansweredQuestions?.length})</p>
            </div>

            <div className=''>
                {
                    unansweredQuestions.map(singleQuestions => 
                    <YourQuestionsCard key={singleQuestions._id} singleQuestions={singleQuestions}></YourQuestionsCard>)
                }
            </div>
        </div>
    );
};

export default QuestionsWithoutAnswer;