import React from 'react';
import { MdDelete } from 'react-icons/md';
import { RiQuestionAnswerLine } from 'react-icons/ri';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/UseAxioxSecure/useAxiosSecure';
import useAllQuestions from '../../../Hooks/useAllQuestions/useAllQuestions';
import { FaRegEdit } from 'react-icons/fa';

const AdminQuestionCard = ({ singleQuestions }) => {

    const axiosSecure = useAxiosSecure();
    const [allQuestions, refetch] = useAllQuestions();

    const handleAnswers = async (id) => {
        const { value: text } = await Swal.fire({
            input: "textarea",
            inputLabel: "Answer",
            confirmButtonColor: "#013a2c",
            cancelButtonColor: "#d33",
            inputPlaceholder: "Type answer here...",
            inputAttributes: {
                "aria-label": "Type answer here"
            },
            showCancelButton: true
        });

        if (text) {
            const answer = {
                answer: text,
                answerTime: new Date().toLocaleString()
            };

            try {
                const submittedAnswer = await axiosSecure.patch(`/answers/${id}`, answer);

                if (submittedAnswer.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Answered successfully",
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
                    text: "There was an error submitting the answer",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        }
    };


    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't delete this questions!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#013a2c",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/questions/${id}`);

                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Question deleted successfully",
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
    };

    return (
        <div className='bg-white p-3 rounded-xl flex flex-col md:flex-row gap-5 justify-between mb-3'>
            <div className='space-y-2'>
                <p className='text-base'>
                    <span className='font-medium'>Email:</span> {singleQuestions?.email}
                </p>
                <p className='text-base'>
                    <span className='font-medium'>Question:</span> {singleQuestions?.question}
                    <span className='text-red-800 text-xs block'>
                        on {singleQuestions?.questionTime}
                    </span>
                </p>
                {
                    singleQuestions?.answer ?
                        <p className='text-base'>
                            {
                                singleQuestions?.answer.main ?
                                    <div>
                                        <strong>{singleQuestions?.answer.main}</strong>
                                        <br />
                                        <br />
                                        <strong><em>Quran:</em></strong>
                                        <br />
                                        {singleQuestions?.answer.quran}
                                        <br />
                                        <br />
                                        <strong><em>Hadith:</em></strong>
                                        <br />
                                        {singleQuestions?.answer.hadith}
                                    </div>
                                    :
                                    <div>
                                        <span className='font-medium'>Answer:</span> {singleQuestions?.answer}
                                        <span className='text-red-800 text-xs block'>
                                            on {singleQuestions?.answerTime}
                                        </span>
                                    </div>
                            }

                        </p>
                        :
                        <p className='text-red-800'>No answer yet.</p>
                }
            </div>
            <div className='flex gap-3 items-center text-3xl'>
                {
                    singleQuestions?.answer ?
                        <>
                            <button onClick={() => handleAnswers(singleQuestions?._id)}>
                                <FaRegEdit />
                            </button>
                        </>
                        :
                        <>
                            <button onClick={() => handleAnswers(singleQuestions?._id)}>
                                <RiQuestionAnswerLine />
                            </button>
                        </>
                }
                <button onClick={() => handleDelete(singleQuestions?._id)}><MdDelete /></button>
            </div>
        </div>
    );
};

export default AdminQuestionCard;
