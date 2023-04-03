import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

const RequireAuth = ({allowedRole}) => {
    const location = useLocation()
    const [cookies, setCookie, removeCookie] = useCookies(['cred'])
    const cookieAuth = cookies['cred']
    console.log('print below is from req auth')
    
    if(!cookieAuth){
        return <Navigate to='/auth' state={{from: location}} replace />
    }
    const userRole = cookieAuth.roles

    if (userRole === 'admin') {
        return (<Outlet />) 
    }
    
    if (allowedRole === userRole) {
        return (<Outlet />) 
    } else {
        return <Navigate to='/' state={{from: location}} replace />
    }
}

export default RequireAuth