import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';

//if already login, cannot get access to authorization Pages, redirect to HomePage
function AuthGuard () {

    const accessToken = Cookies.get('accessToken')
    if(accessToken){
       return <Navigate to='/' replace />
    }
    return <Outlet />;
}
export default AuthGuard;