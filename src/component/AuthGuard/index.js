import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

function AuthGuard ({children}) {

    const accessToken = Cookies.get('accessToken')
    if(accessToken){
       return <Navigate to='/' replace />
    }
    return children;
}
export default AuthGuard;