import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import './Home.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { IoCall } from 'react-icons/io5';
import { RiMessengerLine, RiQuestionnaireFill } from 'react-icons/ri';
import MessageForm from '../../Components/MessageForm';
import PrayerTimes from './PrayerTime';
import VideosForHome from './VideosForHome';
import SuraAudioPlayer from '../../Components/SuraAudioPlayer';
import ParaAudioPlayer from '../../Components/ParaAudioPlayer';
import QuestionToAI from './QuestionToAI';
import useAxiosPublic from '../../Hooks/useAxiosPublic/useAxiosPublic';
import useAuth from '../../Hooks/UseAuth/useAuth';
import Swal from 'sweetalert2';

const Home = () => {

    const [savedQA, setSavedQA] = useState(null);
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const askQuestion = async () => {
        if (user && user?.email) {
            const { value: question } = await Swal.fire({
                title: "Ask AI a Question",
                input: "text",
                inputPlaceholder: "Type your question here...",
                showCancelButton: true,
                confirmButtonColor: "#013a2c",
                cancelButtonColor: "#d33",
                confirmButtonText: "Send Question",
            });

            if (question) {
                try {
                    const response = await axiosPublic.get(`/noorify-ai`, {
                        params: { question },
                    });

                    const answer = response.data;

                    const formattedAnswer = `
                        <strong><em>Answer:</em></strong><br>${answer.main}<br>
                        <strong><em>Quran (Ref):</em></strong><br>${answer.quran}<br><br>
                        <strong><em>Hadith (Ref):</em></strong><br>${answer.hadith}
              `;

                    setSavedQA({ question, answer });

                    Swal.fire({
                        title: "AI Response",
                        html: formattedAnswer,
                        showCancelButton: true,
                        confirmButtonColor: "#013a2c",
                        cancelButtonText: "Close",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Save this question to profile",
                    }).then(async (result) => {
                        if (result?.isConfirmed) {

                            const questions = {
                                email: user?.email,
                                question: question,
                                answer: answer,
                                questionTime: new Date().toLocaleString() // Adding local date and time
                            };


                            await axiosPublic.post("/questions", questions)
                                .then(() => {
                                    Swal.fire({
                                        position: "center",
                                        icon: "success",
                                        title: "QA saved successfully",
                                        showConfirmButton: false,
                                        timer: 3000,
                                    });
                                })

                        }
                    });
                } catch (error) {
                    Swal.fire("Error", "Failed to fetch answer", "error");
                }
            }
        } else {
            Swal.fire({
                title: "Please login to ask a question!",
                text: "You need to be logged in to ask a question.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#013a2c",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: { from: location } });
                }
            });
        }
    };

    return (
        <div className='py-10 px-3 flex flex-col items-center justify-center md:min-h-[calc(100vh-96px)] min-h-[calc(100vh-84px)] max-w-7xl mx-auto'>

            <Helmet>
                <title>Noorify | Home</title>
            </Helmet>

            {/* AI Question  */}

            <QuestionToAI></QuestionToAI>

            {/* AI question of home before messageform  */}


            <div className='flex flex-col gap-3 items-center justify-center'>
                <p className='text-xl md:text-3xl font-medium text-white text-center'>যে কোনো মাসআলা বা
                    ইসলাম সম্পর্কিত যে কোন প্রশ্ন করুন এখনই</p>
                <div className="flex justify-center items-center mt-5 ">
                    <button
                        onClick={askQuestion}
                        className="bg-[#013a2c] font-semibold text-white px-6 py-3 w-full rounded-xl border-2 border-white"
                    >
                        <div className="animate__animated animate__pulse animate__infinite text-sm md:text-lg flex gap-3 items-center justify-center ">
                            Ask any Question to Noorify AI <div className="text-xl"><RiQuestionnaireFill /></div>
                        </div>
                    </button>
                </div>

                <p className='text-xl mt-5 md:text-xl font-medium text-white text-center'>অথবা কোন ইসলামী স্কলারকে প্রশ্ন করুন
                </p>

                <MessageForm></MessageForm>
            </div>


            <div className='flex flex-col gap-5 pt-3 md:pt-8'>
                <p className='text-lg md:text-xl font-medium text-white text-center'>----  দ্রুত উত্তর পেতে  ----</p>

                <div className='flex flex-wrap lg:flex-row gap-5 items-center justify-around'>

                    <Link to={"tel:+8801728512273"}>
                        <button className='hover:bg-white rounded-md hover:text-[#013a2c] py-3 px-6 border-2 border-white text-[15px] font-medium text-white box-shadow flex items-center gap-5'>Direct Call <IoCall /></button>
                    </Link>
                    {/* <Link to={'https://www.facebook.com/messages/t/205301289330938'}>
                        <button className='hover:bg-white rounded-md hover:text-[#013a2c] py-3 px-6 border-2 border-white text-[15px] font-medium text-white box-shadow flex items-center gap-5'>Messenger<RiMessengerLine />
                        </button>
                    </Link> */}
                    <Link to={'https://wa.me/+8801728512273'}>
                        <button className='hover:bg-white rounded-md hover:text-[#013a2c] py-3 px-6 border-2 border-white text-[15px] font-medium text-white box-shadow flex items-center gap-5'>WhatsApp <FaWhatsapp /></button>
                    </Link>
                    <Link>
                        <button onClick={askQuestion} className='hover:bg-white rounded-md hover:text-[#013a2c] py-3 px-6 border-2 border-white text-[15px] font-medium text-white box-shadow flex items-center gap-5'>Noorify AI <RiQuestionnaireFill /></button>
                    </Link>
                </div>
            </div>

            <div>
                <PrayerTimes></PrayerTimes>
            </div>

            <div>
                <VideosForHome></VideosForHome>
            </div>

            <div >
                <div>
                    <h1 className='md:mt-20 mt-10 pb-10 md:pb-10 text-2xl text-white font-semibold text-center '>Audios</h1>
                </div>
                <div className='flex justify-between items-center gap-10 flex-col md:flex-row'>
                    <SuraAudioPlayer></SuraAudioPlayer>
                    <ParaAudioPlayer></ParaAudioPlayer>
                </div>
            </div>
        </div>
    );
};

export default Home;