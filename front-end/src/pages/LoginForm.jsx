import React from 'react'
import { useState } from "react";
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

    return (
        <div className=' h-full flex flex-col justify-center  sm:bg-blue-gray-50'>
            {isLogin? <LoginComp  handleChangeMode={handleMode} />: <RegisterComp handleChangeMode={handleMode}/>}            
        </div>
    )
}

export default LoginForm