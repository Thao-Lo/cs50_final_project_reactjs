import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import RegisterForm from "../../component/RegisterForm";

function RegisterPage() {
    const [authentication, setAuthentication] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })   
    const [isLoading, setIsLoading] = useState(false);   

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAuthentication((prev) => ({
            ...prev,
            [name]: value
        }))

    }
    const handleSubmit = (event) => {
        event.preventDefault();

    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
            <RegisterForm authentication={authentication} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />               
        </Box>
    )

}
export default RegisterPage;