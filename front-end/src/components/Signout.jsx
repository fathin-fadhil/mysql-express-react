import { useCookies } from "react-cookie";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Signout() {
    const [cookies, setCookie, removeCookie] = useCookies(['cred'])
    const {setAuth} = useAuth()
    const navigate = useNavigate()
    removeCookie('cred')
    axios.delete('/logout', {withCredentials: true}).then( () => {
        setAuth({})
        navigate('/')
    }).catch(err => {
        console.log(err)
    })
    

  
}

export default Signout