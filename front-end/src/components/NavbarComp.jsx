import { useState, useEffect } from 'react'
import { Navbar, MobileNav, Typography, Button, IconButton } from "@material-tailwind/react";
import pjslogo from '../assets/pjslogo.svg';
import ProfileMenuComp from './ProfileMenuComp';
import { CiLogin } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function NavbarComp() {
    const [openNav, setOpenNav] = useState(false);
    const navigate = useNavigate()
    const [cookies] = useCookies(['cred'])

    useEffect(() => {
        window.addEventListener(
          "resize",
          () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
      if (cookies['cred'] && cookies['cred'].name) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    });
    const goToCatalog = () => {
        navigate('/catalog')
    }
    

    const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
        >
            <a href="/" className="flex items-center">
                Home
            </a>
        </Typography>
        <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
        >
            <a href="/aboutus" className="flex items-center">
                About Us
            </a>
        </Typography>
        <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
        >
            <a href="/gallery" className="flex items-center">
                Gallery
            </a>
        </Typography>

    </ul>
    );

    return (
    <>
      <Navbar className="fixed inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
        <div className="flex items-center  text-blue-gray-900 justify-between">
          <img src={pjslogo} className=' h-11'></img>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
              onClick={goToCatalog}
            >
              <span>Catalog</span>
            </Button>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
            {isLoggedIn ? <ProfileMenuComp /> : <a href='/auth'> <Button variant="outlined" size='sm' className='flex gap-2 items-center'> <CiLogin strokeWidth={2} size={15}/> Login</Button> </a>}
          </div>
          
        </div>
        <MobileNav open={openNav}>
          {navList}
          <Button variant="gradient" size="sm" fullWidth className="mb-2">
            <span>Catalog</span>
          </Button>
        </MobileNav>
      </Navbar>
    </>
    )
}

export default NavbarComp