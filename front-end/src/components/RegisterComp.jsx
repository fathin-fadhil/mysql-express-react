import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";

import React from 'react'

export default function RegisterComp(props) {
    const handleMode = props.handleChangeMode
    const handleRegister = props.handleRegister

    let data ={}

    const handleChange = (ev) => {
        const name = ev.target.name;
        const value = ev.target.value;
        data = {...data, [name]: value}
    }

    const compHandleRegister = (ev) => {
        ev.preventDefault()
        handleRegister(data)
    }

    return (
        <div className='mx-auto'>
            <Typography variant="h2" color="blue-gray" className='text-center font-semibold'>
                Create an account
            </Typography>

            <div className=' flex justify-center mb-5'>
                <Typography variant='h6' className='text-gray-600 font-light'>
                    Already have an account? 
                </Typography>

                <Typography variant='h6' className=' text-blue-400 font-semibold cursor-pointer  ml-1' onClick={handleMode}>
                    Log in 
                </Typography>
            </div>
                    
            <Card color="transparent" shadow={false} className='min-w-md max-w-lg items-center align-middle bg-white  p-5 sm:shadow' >                
                <Typography color="gray" className="mt-1 font-normal">
                    Enter your details to register.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={compHandleRegister}>
                    <div className="mb-4 flex flex-col gap-6">
                    <Input size="lg" label="Name" name="name" onChange={handleChange}/>
                    <Input size="lg" label="Email" name="email" onChange={handleChange} type="email"/>
                    <Input type="password" size="lg" label="Password" name="password" onChange={handleChange}/>
                    </div>
                    <Checkbox
                        label={
                            (
                            <Typography
                                variant="small"
                                color="gray"
                                className="flex items-center font-normal"
                            >
                                I agree the
                                <a
                                href="#"
                                className="font-medium transition-colors hover:text-blue-500"
                                >
                                &nbsp;Terms and Conditions
                                </a>
                            </Typography>
                            )
                        }
                        containerProps={{ className: "-ml-2.5" }}
                    />
                    <Button className="mt-6" fullWidth type="submit">
                        Register
                    </Button>
                </form>
            </Card>
        </div>    
  )
}
