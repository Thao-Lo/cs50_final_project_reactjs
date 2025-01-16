import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LoginForm from "../../component/LoginForm";
import { RESERVATION_ACTION, useReservation } from "../../hooks/ReservationContext";
import { USER_ACTION, useUser } from "../../hooks/UserContext";
import { login } from "../../services/authService";

function LoginPage() {
    const { state: { error }, dispatch } = useUser();
    const { state: { sessionId }, dispatch: reservationDispatch } = useReservation();
    //initial value
    const [authentication, setAuthentication] = useState({
        usernameOrEmail: '',
        password: ''
    })
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    //Form controll, updating each user input
    const handleInputChange = (e) => {
        //destructuring name and value attribute from Input
        const { name, value } = e.target;
        //only change the target input
        setAuthentication((prev) => ({
            ...prev,
            [name]: value
        }))

    }
    // when user submit login form
    const handleSubmit = async (event) => {
        event.preventDefault();
        //Form validation
        if (!authentication.usernameOrEmail || !authentication.password) {
            dispatch({ type: USER_ACTION.AUTH_ERROR, payload: 'Cannot leave input empty.' })
            return;
        }
        setIsLoading(true)
        //call API to login
        const result = await login(authentication)
        console.log("login result:", result);

        if (result.error) {
            dispatch({ type: USER_ACTION.AUTH_ERROR, payload: result.message })
            setIsLoading(false)
            return;

        } else {
            // store user info to useUser Context
            dispatch({ type: USER_ACTION.LOGIN, payload: result.user })
            dispatch({ type: USER_ACTION.AUTH_MESSAGE, payload: result.message })
            //if user do booking before login, get sessionId from sessionStorage and save to Reservation Context
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
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '90vh' }}>
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