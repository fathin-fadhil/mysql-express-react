import React from 'react';
import {FaFacebookF, FaTwitter, FaYoutube, FaInstagram} from 'react-icons/fa';
import pjslogo from '../assets/pjslogo.svg';
import {Typography} from "@material-tailwind/react";

const FooterComp = () => {
    return (
        <footer className="w-full bg-blue-gray-50 p-8">
                <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12  text-center md:justify-between">
                    <img src={pjslogo} alt="logo-ct" className="w-[150px]" />
                    <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                        <li>
                            <Typography as="a" href="#" color="blue-gray" className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500">
                            <FaInstagram/>
                            </Typography>
                        </li>
                        <li>
                            <Typography as="a" href="#" color="blue-gray" className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500">
                            <FaYoutube/>
                            </Typography>
                        </li>
                        <li>
                            <Typography as="a" href="#" color="blue-gray" className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500">
                            <FaTwitter/>
                            </Typography>
                        </li>
                        <li>
                            <Typography as="a" href="#" color="blue-gray" className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500" >
                            <FaFacebookF/>
                            </Typography>
                        </li>
                    </ul>
                </div>
                <hr className=" my-2 border-blue-gray-50" />
                <Typography color="blue-gray" className="text-center font-normal">
                    &copy; 2023 PJS Library
                </Typography>
            </footer>
    );
}

export default FooterComp;
