import React from 'react';
import logo from "../../assets/circle-logo.png"
import { FaFacebook, FaFacebookMessenger } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='border-t-2 border-white'>
            <footer className="footer text-white max-w-7xl mx-auto p-10">
                {/* <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav> */}
                <div className='flex flex-col justify-center items-center w-full h-full'>
                    <img className='max-w-28 border-2 border-white rounded-full' src={logo} alt="" />
                </div>
                <nav className='h-full w-full justify-center items-center'>
                    <div>
                        <h6 className="footer-title">Company</h6>
                        <a href='/about-us' className="link link-hover">About us</a>
                        {/* <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a> */}
                    </div>
                </nav>
                <nav className="flex justify-center items-center h-full w-full">
                    <div className="grid grid-flow-col gap-4 text-2xl">
                        <Link to={'https://www.facebook.com/profile.php?id=61554977950433'}><FaFacebook /></Link>
                        <Link to={'https://www.facebook.com/messages/t/205301289330938'}><FaFacebookMessenger /></Link>
                        <Link to={'https://wa.me/+8801728512273'}><IoLogoWhatsapp /></Link>
                    </div>
                </nav>
                {/* <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav> */}
            </footer>
            <footer className="footer text-white max-w-7xl mx-auto border-base-300 border-t px-10 py-4">
                <aside className="grid-flow-col items-center mx-auto">
                    <p>
                        Noorify since 2024
                    </p>
                </aside>
                {/* <nav className="md:place-self-center md:justify-self-end">
                    <div className="grid grid-flow-col gap-4">
                        
                    </div>
                </nav> */}
            </footer>
        </div>
    );
};

export default Footer;