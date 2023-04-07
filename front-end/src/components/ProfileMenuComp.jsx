import React from 'react';
import { useState } from 'react'
import { UserCircleIcon,  ChevronDownIcon, Cog6ToothIcon, BookOpenIcon, UserGroupIcon  , PowerIcon } from "@heroicons/react/24/outline";
import { Typography, Button, Menu, MenuHandler, MenuList, MenuItem, Avatar} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';


function ProfileMenuComp() {
  const [cookies, setCookie, removeCookie] = useCookies(['cred'])
  const cookieAuth = cookies['cred']
  const userRole = cookieAuth.roles
  const navigate = useNavigate()
  const closeMenu = () => setIsMenuOpen(false);
  const goToMyBook = () => {navigate('/mybooks')}
  const goToAdminPage = () => {navigate('/admin')}

    const profileMenuItems = [
      {
        label: "My Profile",
        icon: UserCircleIcon,
        onclick: closeMenu
      },
      {
        label: "Edit Profile",
        icon: Cog6ToothIcon,
        onclick: closeMenu
      },
      {
        label: "My Books",
        icon: BookOpenIcon,
        onclick: goToMyBook
      },
      {
        label: "Sign Out",
        icon: PowerIcon,
      },
    ];  

    if (userRole === 'admin') {
      profileMenuItems.splice(3, 0, {
        label: 'Admin Page',
        icon: UserGroupIcon ,
        onclick: goToAdminPage
      })
    }
  
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const handleSignout = () => {setIsMenuOpen(false); navigate('/signout')}
   
    return (
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
          >
            <Avatar
              variant="circular"
              size="sm"
              alt="candice wu"
              className="border border-blue-500 p-0.5"
              src="https://t3.ftcdn.net/jpg/03/39/45/96/360_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg"
            />
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          {profileMenuItems.map(({ label, icon, onclick }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem
                key={label}
                onClick={isLastItem? handleSignout: onclick}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    );
  }

export default ProfileMenuComp;
