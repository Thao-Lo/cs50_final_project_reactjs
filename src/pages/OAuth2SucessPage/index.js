import { Box, Container, Typography } from "@mui/material";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { RESERVATION_ACTION, useReservation } from "../../hooks/ReservationContext";
import { USER_ACTION, useUser } from "../../hooks/UserContext";
import { getOAuth2LoginDetails } from "../../services/authService";

function OAuth2SuccessPage() {
    const [searchParam] = useSearchParams();
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const { dispatch } = useUser();
    const { dispatch: reservation} = useReservation();
    const navigate = useNavigate();

    const oauth2sessionId = searchParam.get("oauth2sessionId");

    const fetchOAuth2LoginDetail = async () => {
        if (!oauth2sessionId) {
            setError('Login Failed. Please try again.')
            return;
        } 
       
            const result = await getOAuth2LoginDetails(oauth2sessionId);
            if (result.error) {               
                setError(result.message);
                setIsLoading(false)
                return;    
            }else{
                dispatch({ type: USER_ACTION.LOGIN, payload: result.user });
                dispatch({ type: USER_ACTION.AUTH_MESSAGE, payload: result.message })
        
                if (Cookies.get("sessionId")) {
                    reservation({ type: RESERVATION_ACTION.SET_SESSION_ID, payload: Cookies.get("sessionId") })
                    sessionStorage.removeItem("sessionId");
                }
                console.log(result);
                setIsLoading(false)
                navigate(result.user.role === "ADMIN" ? '/admin' : '/')            
        }      
    }

    useEffect(() => {
        fetchOAuth2LoginDetail();
    }, [])
    return (
        <>
            <Container maxWidth="lg">
                {isLoading && (
                    <Box>Login/Register in progress....</Box>
                )}
                {error && (
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                        <Box>{error}</Box>
                        <Typography component={NavLink} to={'/login'}>Click to Login</Typography>
                    </Box>
                )}

            </Container>
        </>
    )
}
export default OAuth2SuccessPage;