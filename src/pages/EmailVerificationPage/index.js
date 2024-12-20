import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { verifyEmail } from "../../services/authService";

function EmailVerificationPage() {
    const [validate, setValidate] = useState({
        'email':'',
        'code': ''
    })
    const [codeError, setCodeError] = useState('');
    const [emailError, setEmailError] = useState('');

    const [error, setError] = useState('')
    const [isValid, setIsValid] = useState(false)

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValidate((prev) => ({
            ...prev, 
            [name]: value
        }))
    }
    const validateInput = (e) => {
        const {name, value} = e.target;
        if(name === 'email'){
            if (!/^[\w-\.]+@([\w-]+\.)+[a-zA-Z]{2,}$/.test(value)) {
                setEmailError('Email is not valid');
            } else {
                setEmailError('')
            }
        }
        if(name === 'code'){
            if (!/^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/.test(value)) {
                setCodeError('Email is not valid');
            } else {
                setCodeError('')
            }
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await verifyEmail(validate.email, validate.code)
        if(result.error){
            setError(result.message)            
        }     
        setIsValid(true);

    }
    

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
            <Box component="form" onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '20rem',
                    m: 2,
                    '& .MuiTextField-root': { width: '100%' }
                }}
                noValidate
                autoComplete="off">

                <Box sx={{ fontSize: '1.5rem', fontWeight: 'bold', mb: 2 }}>
                    Email verification
                </Box>
                <Box>Please check your email to get verification code</Box>
                <TextField
                id="validate-email-input"
                label="Email"
                type="email"
                variant="standard"
                name="email"
                value={validate.email}
                onChange={(e) => {handleInputChange(e); validateInput(e)}}
                helperText={emailError || ' '}
                error = {!!emailError}
            />
                <TextField
                    id="validate-code"
                    label="Code"
                    type="text"
                    variant="standard"
                    name="code"
                    value={validate.code}
                    onChange={(e) => {handleInputChange(e); validateInput(e)}}
                    helperText={codeError || ' '}
                    error = {!!codeError}
                />
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" type="submit" sx={{ width: '100%' }}>
                        Validate 
                    </Button>
                </Box>
                <Box>{!!error? error : ' '}</Box>
            </Box>
        </Box>
    )

}
export default EmailVerificationPage;