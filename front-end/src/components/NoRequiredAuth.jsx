import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

const RequireAuth = () => {
    const location = useLocation()
    const [cookies, setCookie, removeCookie] = useCookies(['cred'])
    const cookieAuth = cookies['cred']
    console.log('print below is from req auth')
    
    if(cookieAuth !== undefined){
        return <Navigate to='/' state={{from: location}} replace />
    } else {
        return <Outlet />
    }
    
}

export default RequireAuth