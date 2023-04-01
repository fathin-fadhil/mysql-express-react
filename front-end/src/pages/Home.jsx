import React, { useEffect } from 'react'
import { Button, Typography} from "@material-tailwind/react";
import NavbarComp from '../components/NavbarComp';
import {RxArrowRight} from 'react-icons/rx';
import {FaFacebookF, FaTwitter, FaYoutube, FaInstagram} from 'react-icons/fa';
import pjslogo from '../assets/pjslogo.svg';
import mainimage from '../assets/img/mainimage.jpeg'
import GalleryComp from '../components/GalleryComp';

function Home(props) {
    const goTo = props.element || 'hero'

    useEffect(() => {
        const xCoor = document.getElementById(goTo).getBoundingClientRect().top - 100
        window.scrollTo({behavior: 'smooth', top:xCoor})
    }, [])

    return (
        <>
            <NavbarComp />            
            <div className=' block '>
                <section id='hero'>
                    <div>
                        <div className=" bg-center  bg-[url('/images/mainimage.jpeg')] bg-cover w-full h-screen text-center" style={{backgroundImage: `url(${mainimage})`}} >
                            <div className=' bg-black bg-cover w-full h-full bg-opacity-75 flex flex-col justify-center p-6'>
                                <h1 className='text-5xl md:text-5xl xl:text-6xl text-white font-bold mb-5'>Welcome To PJS Library</h1>                            
                                <div className=" xl:px-30">
                                    <p className=' text-white mb-5 text-sm md:text-base xl:text-xl'>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur,
                                    </p>
                                </div>
                                
                                <Button className=' w-fit mx-auto inline-flex items-center'>
                                    Katalog Buku
                                    <RxArrowRight strokeWidth={1} className="h-4 w-5" />    
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section id='aboutus'>
                    <div className=' flex flex-col text-center bg-blue-gray-50 px-6 py-10 md:py-15 xl:py-24'>
                        <h1 className=' text-gray-900 text-3xl md:text-4xl xl:text-5xl font-bold font-sans '>About US</h1>
                        <hr className=' w-20 mx-auto bg-blue-400 h-2 my-3'></hr>
                        <div className=" w-4/5 lg:w-3/4 mx-auto ">
                            <p className='text-base  lg:text-xl'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id magna ac erat mollis efficitur at eu dui. Nullam hendrerit ipsum nec ex euismod, mollis posuere magna malesuada. Fusce sagittis ipsum sit amet hendrerit commodo. Integer consequat suscipit gravida. Aenean a tempus urna. Pellentesque vel mi ipsum. Aenean venenatis vitae libero non faucibus. Aenean a dui nec mi facilisis suscipit pulvinar in nisl. Integer hendrerit leo ac laoreet lacinia. Vestibulum accumsan, lectus a tempus hendrerit, elit nisi efficitur massa, ac feugiat justo magna eu diam.
                            </p>
                        </div>
                    </div>
                </section>

                <section id='gallery'>
                    <div className=' flex flex-col text-center p-6'>
                        <h1 className=' text-gray-900 text-3xl md:text-4xl xl:text-5xl font-bold font-sans'> Photo Gallery</h1>
                        <hr className=' w-20 mx-auto bg-blue-400 h-2 my-5'></hr>
                        
                        <GalleryComp />

                    </div>
                </section>
            </div>

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
        </>       
    )
}

export default Home