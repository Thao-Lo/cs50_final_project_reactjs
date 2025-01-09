import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LoginForm from "../../component/LoginForm";
import { login } from "../../services/authService";
import { USER_ACTION, useUser } from "../../hooks/UserContext";
import { RESERVATION_ACTION, useReservation } from "../../hooks/ReservationContext";

function LoginPage() {
    const { state: { error }, dispatch } = useUser();
    const { state: { sessionId }, dispatch: reservationDispatch } = useReservation();
    const [authentication, setAuthentication] = useState({
        usernameOrEmail: '',
        password: ''
    })
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAuthentication((prev) => ({
            ...prev,
            [name]: value
        }))

    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!authentication.usernameOrEmail || !authentication.password) {
            dispatch({ type: USER_ACTION.AUTH_ERROR, payload: 'Cannot leave input empty.' })
            return;
        }
        setIsLoading(true)
        const result = await login(authentication)
        console.log("login result:", result);

        if (result.error) {
            dispatch({ type: USER_ACTION.AUTH_ERROR, payload: result.message })
            setIsLoading(false)
            return;

        } else {
            dispatch({ type: USER_ACTION.LOGIN, payload: result.user })
            dispatch({ type: USER_ACTION.AUTH_MESSAGE, payload: result.message })
            const storedSessionId = sessionStorage.getItem('sessionId');
            console.log("login session id:" + storedSessionId);
            if (storedSessionId) {
                reservationDispatch({ type: RESERVATION_ACTION.SET_SESSION_ID, payload: { sessionId: storedSessionId } })
                sessionStorage.removeItem('sessionId');
            }

            setIsLoading(false)
            navigate(result.user.role === "ADMIN" ? '/admin' : '/')
        }

    }

    return (
        <Container maxWidth='lg'>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height:'90vh'}}>
                {isLoading ?
                    (<Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>) :
                    (
                        <>
                            <LoginForm authentication={authentication} handleInputChange={handleInputChange} handleSubmit={handleSubmit} error={error} />
                            <Typography component={NavLink} to={'/register'}>Not Register yet? Click here</Typography>
                        </>
                    )}
            </Box>
        </Container>

    )
}
export default LoginPage;