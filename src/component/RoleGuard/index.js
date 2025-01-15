import { Navigate, Outlet } from "react-router-dom";
import { USER_ACTION, useUser } from "../../hooks/UserContext";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";

function RoleGuard({ allowedRole }) {
    const { state: { user, isAuthenticated }, dispatch } = useUser();
    //to ensure useEffect is called before checking other condition
    const [isLoading, setIsLoading] = useState(true)
    const accessToken = Cookies.get('accessToken');
    const [userRoleFromToken, setUserRoleFromToken] = useState(null)

    //when page is refresh after payment, its the need of GUEST Role to render user/reservation/payment-complete
    useEffect(() => {
        if (accessToken && !isAuthenticated) {
            try {
                //use jwt decode to get role from accessToken
                const decode = jwtDecode(accessToken);
                setUserRoleFromToken(decode.role);
                dispatch({ type: USER_ACTION.SET_AUTHENTICATED });
            } catch (error) {
                console.error("Invalid token:", error.message);
                Cookies.remove('accessToken');
            }
        }
        setIsLoading(false)
    }, [accessToken, dispatch. isAuthenticated]);

    if (isLoading) return <Box>Loading Role...</Box>

    if (!isAuthenticated) {
        return <Navigate to="/" replace />
    }

    //combione 2 role values, remove undefined, null, false
    const combinedRoles = [user?.role, userRoleFromToken].filter(Boolean);

    // some: array func, check at least 1 element satisfy the condition -> return true/false  
    const hasAccess = combinedRoles.some((role) => allowedRole.includes(role));
   
    if (hasAccess) {
        return <Outlet />
    }
    return <Navigate to="/403" replace />

}
export default RoleGuard;