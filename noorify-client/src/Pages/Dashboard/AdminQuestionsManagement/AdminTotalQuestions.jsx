import React from 'react';
import useAllQuestions from '../../../Hooks/useAllQuestions/useAllQuestions';
import { Helmet } from 'react-helmet';
import AdminQuestionCard from './AdminQuestionCard';

const AdminTotalQuestions = () => {

    const [allQuestions, refetch] = useAllQuestions();


    return (
        <div>
            <Helmet>
                <title>Noorify | Admin | Total Questions</title>
            </Helmet>

            <div>
                <p className="font-medium text-white text-3xl text-center pb-10">All Questions ({allQuestions?.length})</p>
            </div>

            <div className=''>
                {
                    allQuestions.map(singleQuestions => 
                    <AdminQuestionCard key={singleQuestions._id} singleQuestions={singleQuestions}></AdminQuestionCard>)
                }
            </div>

        </div>
    );
};

export default AdminTotalQuestions;