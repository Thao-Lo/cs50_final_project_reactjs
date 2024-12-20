import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import RegisterForm from "../../component/RegisterForm";
import { register } from "../../services/authService";

function RegisterPage() {
    const [authentication, setAuthentication] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
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
            console.log("register done");
        }
        

    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
            <RegisterForm authentication={authentication} handleInputChange={handleInputChange} handleSubmit={handleSubmit} error={error} />

        </Box>
    )

}
export default RegisterPage;