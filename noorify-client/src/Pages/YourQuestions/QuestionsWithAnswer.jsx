import React, { useEffect, useState } from 'react';
import useQuestions from '../../Hooks/useQuestions/useQuestions';
import { Helmet } from 'react-helmet';
import YourQuestionsCard from './YourQuestionsCard';

const QuestionsWithAnswer = () => {

    const [questions, refetch] = useQuestions();
    const [answeredQuestions, setAnsweredQuestions] = useState([]);

    useEffect(() => {
        if (questions?.length > 0) {
            const filteredAnswered = questions.filter(q => q.answer );
            setAnsweredQuestions(filteredAnswered);
        }
    }, [questions]);

    return (
        <div>
            <Helmet>
                <title>Noorify | Answered questions</title>
            </Helmet>

            <div>
                <p className="font-medium text-white text-3xl text-center pb-10">Answered questions ({answeredQuestions?.length})</p>
            </div>

            <div className=''>
                {
                    answeredQuestions.map(singleQuestions => 
                    <YourQuestionsCard key={singleQuestions._id} singleQuestions={singleQuestions}></YourQuestionsCard>)
                }
            </div>
        </div>
    );
};

export default QuestionsWithAnswer;