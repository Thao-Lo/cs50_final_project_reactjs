import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import RegisterForm from "../../component/RegisterForm";
import { register } from "../../services/authService";
import { NavLink, useNavigate } from "react-router-dom";

function RegisterPage() {
    const [authentication, setAuthentication] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
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
        const result = await register(authentication);
        if (result.error) {
            setError(result.message)
        } else {
            navigate(`/verify-email?email=${authentication.email}`)
        }       

    }

    return (
        <Box sx={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
            <RegisterForm authentication={authentication} handleInputChange={handleInputChange} handleSubmit={handleSubmit} error={error} />
            <Typography component={NavLink} to={'/login'}>Already have account? Click to Login</Typography>
        </Box>
    )

}
export default RegisterPage;