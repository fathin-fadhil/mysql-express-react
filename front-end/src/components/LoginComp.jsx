import React from 'react'
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";

export default function LoginComp(props) {
    const handleMode = props.handleChangeMode
    const handleLogin = props.handleLogin

    let data ={}

    const compHandleLogin = (ev) => {
        ev.preventDefault()
        handleLogin(data)
    }

    const handleChange = (ev) => {
        const name = ev.target.name;
        const value = ev.target.value;
        data = {...data, [name]: value}
    }

    return (
        <div className='mx-auto'>
            <Typography variant="h2" color="blue-gray" className='text-center font-semibold'>
                Log in to your account
            </Typography>
  
            <div className=' flex justify-center mb-5'>
                <Typography variant='h6' className='text-gray-600 font-light'>
                    Don't have an acoount? 
                </Typography>
  
                <Typography variant='h6' className=' text-blue-400 font-semibold cursor-pointer  ml-1' onClick={handleMode}>
                    Sign up 
                </Typography>
            </div>
                      
            <Card color="transparent" shadow={false} className='min-w-md max-w-lg items-center align-middle bg-white  p-5 sm:shadow' >
                
                <Typography color="gray" className="mt-1 font-normal">
                    Please enter your credentials.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={compHandleLogin}>
                    <div className="mb-4 flex flex-col gap-6">                        
                        <Input size="lg" label="Email" type='email' name='email' onChange={handleChange}/>
                        <Input type="password" size="lg" label="Password" name='password' onChange={handleChange}/>
                    </div>

                    <Button className="mt-6" fullWidth type='submit'>
                        Log in
                    </Button>

                </form>
            </Card>
        </div>    
    )
}
