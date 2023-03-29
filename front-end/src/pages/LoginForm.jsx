import React, { useEffect, useState } from 'react'
import axios from 'axios';

import RegisterComp from '../components/RegisterComp';
import LoginComp from "../components/LoginComp";
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";

function LoginForm() {
    const [isLogin, setIsLogin] = useState(false);
    const handleMode = () => {
        setIsLogin(!isLogin)
    }

    const handleLogin = (data) => {
        console.log(data)        
    }

    const handleRegister = (data) => {
        console.log(data)
    }

    return (
        <div className=' h-full flex flex-col justify-center  sm:bg-blue-gray-50'>
            {isLogin? <LoginComp  handleChangeMode={handleMode} handleLogin={handleLogin} />: <RegisterComp handleChangeMode={handleMode} handleRegister={handleRegister}/>}            
        </div>
    )
}

export default LoginForm