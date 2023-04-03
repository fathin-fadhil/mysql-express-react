import {useState, useContext} from 'react'
import {Card, Input, Button, Typography} from "@material-tailwind/react";
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function LoginComp(props) {
    const handleMode = props.handleChangeMode

    const navigate = useNavigate()
    const {auth, setAuth} = useAuth()
    const [message, setMessage] = useState('');
    const [msgColor, setMsgColor] = useState('black');
    const [cookies, setCookie, removeCookie] = useCookies(['cred'])

    const [data, setData] = useState({email:'', password: ''});
    const handleChange = (ev) => {
        const name = ev.target.name;
        const value = ev.target.value;
        setData(prev => { return {...prev, [name]: value}})   
        
    }

    const handleLogin = async (ev) => {
        ev.preventDefault()
        try {
            const result = await axios.post('/login', data, {withCredentials: true})
            console.log(result)
            const { accessToken, name, email, roles } = result.data
            await setAuth({accessToken})       
            setCookie('cred', {name, email, roles}, {path: '/'})   
            navigate('/')

            setData({email:'', password: ''})
        } catch (error) {
            setMsgColor('red')
            
            if (error.response.hasOwnProperty('data')) {
                setMessage(error.response.data.message)
            } else if (error.hasOwnProperty('response')) {
                setMessage(`Server responded with error code ${error.response?.status}` )
            } else {
                console.log(error)
            }        
        }
    }

    const print = () => {
        console.log(auth)
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
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleLogin}>
                    <div className="mb-4 flex flex-col gap-6">                        
                        <Input size="lg" label="Email" type='email' name='email' onChange={handleChange} value={data.email}/>
                        <Input type="password" size="lg" label="Password" name='password' onChange={handleChange} value={data.password}/>
                    </div>

                    <Typography className="font-extralight text-center" variant="small" color={msgColor}>{message}</Typography>

                    <Button className="mt-6" fullWidth type='submit'>
                        Log in
                    </Button>
                    
                </form>
                <Button onClick={print}>
                        print auth
                    </Button>
            </Card>
        </div>    
    )
}
