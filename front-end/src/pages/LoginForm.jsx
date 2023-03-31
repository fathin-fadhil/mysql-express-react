import React, { useState } from 'react'
import axios from 'axios';

import RegisterComp from '../components/RegisterComp';
import LoginComp from "../components/LoginComp";

function LoginForm() {
    const [isLogin, setIsLogin] = useState(true);
    const handleMode = () => {
        setIsLogin(!isLogin)
    }

    return (
        <div className=' h-full flex flex-col justify-center  sm:bg-blue-gray-50'>
            {isLogin
            ? <LoginComp  
                handleChangeMode={handleMode} 
                />
            : <RegisterComp 
                handleChangeMode={handleMode} 
                />}            
        </div>
    )
}

export default LoginForm