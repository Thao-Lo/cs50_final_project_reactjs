import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LoginForm from "../../component/LoginForm";
import { login } from "../../services/authService";

function LoginPage() {

    const [authentication, setAuthentication] = useState({
        usernameOrEmail: '',
        password: ''
    })
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAuthentication((prev) => ({
            ...prev,
            [name]: value
        }))

    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!authentication.usernameOrEmail || !authentication.password){
            setError('Cannot leave input empty.')
            return;
        }
        const result = await login(authentication)
        if(result.error){
            setError(result.message);
            return;
        }else{
            navigate(`/`)
        }

    }

    return (
        <Box sx={{ display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
            <LoginForm authentication={authentication} handleInputChange={handleInputChange} handleSubmit={handleSubmit} error={error} />
            <Typography component={NavLink} to={'/register'}>Not Register yet? Click here</Typography>
        </Box>
    )
}
export default LoginPage;