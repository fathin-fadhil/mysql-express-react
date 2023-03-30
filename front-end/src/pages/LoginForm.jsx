import React, { useState } from 'react'
import axios from 'axios';

import RegisterComp from '../components/RegisterComp';
import LoginComp from "../components/LoginComp";

function LoginForm() {
    const [isLogin, setIsLogin] = useState(false);
    const handleMode = () => {
        setIsLogin(!isLogin)
    }

    const handleLogin = async (data) => {
        console.log(data)
        await axios.post('/login', data)
    }

    return (
        <div className=' h-full flex flex-col justify-center  sm:bg-blue-gray-50'>
            {isLogin
            ? <LoginComp  
                handleChangeMode={handleMode} 
                handleLogin={handleLogin} 
                />
            : <RegisterComp 
                handleChangeMode={handleMode} 
                />}            
        </div>
    )
}

export default LoginForm