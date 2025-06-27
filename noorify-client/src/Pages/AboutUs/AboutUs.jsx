import React from 'react';
import { Helmet } from 'react-helmet';

const AboutUs = () => {
    return (
        <div>
            <Helmet>
                <title>Noorify | About us</title>
            </Helmet>

            <div>
                <p className='font-medium text-white text-3xl pt-5 text-center pb-5 md:pb-10'>About us</p>
            </div>

            <div className='p-5 mb-5 rounded-xl max-w-7xl mx-auto bg-white'>
                <p>
                    Welcome to <strong>Noorify</strong>, your trusted platform for all Islamic solutions. At Noorify, we are dedicated to providing accurate and authentic answers to your Islamic questions, ensuring that every answer is rooted in genuine Islamic teachings.
                </p>
                <p>
                    Noorify is designed to be a complete Islamic ecosystem, providing tools for learning, spirituality, and daily Islamic practices.
                </p>
                <h2>What We Offer:</h2>
                <ul>
                    <li>
                        <strong>Islamic Q&A:</strong> Get reliable answers to your Islamic questions from our carefully curated sources of Islamic knowledge.
                    </li>
                    <li>
                        <strong>Video Content:</strong> Watch engaging educational and motivational videos covering various aspects of Islam.
                    </li>
                    <li>
                        <strong>Courses:</strong> Enroll in Islamic courses tailored for all levels, helping you enhance your understanding of Islamic principles.
                    </li>
                    <li>
                        <strong>Qur'an and Hadith:</strong> Access the Holy Qur'an and Hadith collections with translation and tafsir to connect more deeply with your faith.
                    </li>
                    <li>
                        <strong>Islamic E-commerce:</strong> Browse through our marketplace for Islamic essentials such as prayer mats, tasbihs, attar, caps, and more.
                    </li>
                </ul>
                <p>
                    At Noorify, we believe in spreading the light of knowledge, and our mission is to support you on your journey of practicing and understanding Islam. By offering a holistic platform that serves both your spiritual and practical needs, we strive to empower Muslims worldwide.
                </p>
                <p>
                    Join us on Noorify as we bring the Muslim community together, offering guidance, support, and a wide range of resources to help you grow in faith.
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
