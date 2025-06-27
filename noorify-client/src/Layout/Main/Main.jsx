import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../../Shared/Navbar/Navbar';
import Footer from '../../Shared/Footer/Footer';

const Main = () => {

    const location = useLocation();

    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('register');

    return (
        <div className='flex flex-col justify-between min-h-screen'>
            <div className='min-h-screen'>
                { noHeaderFooter || <Navbar></Navbar> }
                <Outlet></Outlet>
            </div>
            { noHeaderFooter || <Footer></Footer> }
        </div>
    );
};

export default Main;