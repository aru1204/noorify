import React from 'react';
import useQuestions from '../../Hooks/useQuestions/useQuestions';
import { Helmet } from 'react-helmet';
import YourQuestionsCard from './YourQuestionsCard';

const TotalQuestions = () => {

    const [questions, refetch] = useQuestions();

    return (
        <div>
            <Helmet>
                <title>Noorify | Total Questions</title>
            </Helmet>

            <div>
                <p className="font-medium text-white text-3xl text-center pb-10">All Questions ({questions?.length})</p>
            </div>

            <div className=''>
                {
                    questions.map(singleQuestions => 
                    <YourQuestionsCard key={singleQuestions?._id} singleQuestions={singleQuestions}></YourQuestionsCard>)
                }
            </div>
        </div>
    );
};

export default TotalQuestions;