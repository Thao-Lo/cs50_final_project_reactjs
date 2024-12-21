import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { resendValidationCode, verifyEmail } from "../../services/authService";
import { useLocation } from "react-router-dom";

function EmailVerificationPage() {
    const location = useLocation();
    const querySearch = new URLSearchParams(location.search);
    const email = querySearch.get('email');

    const [code, setCode] = useState('')
    const [codeError, setCodeError] = useState('');
    const [emailError, setEmailError] = useState('');

    const [error, setError] = useState('')
    const [isValid, setIsValid] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCode(value)
    }
    const validateInput = (e) => {
        const { name, value } = e.target;
        if (name === 'code') {
            if (!/^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/.test(value)) {
                setCodeError('Email is not valid');
            } else {
                setCodeError('')
            }
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await verifyEmail(email, code)
        if (result.error) {
            setError(result.message)
        }
        setIsValid(true);
    }

    const handleResendCode = async () => {
        if (!email) {
            setEmailError('Please enter valid email')
            return;
        } else {
            setEmailError('')
        }
        const result = await resendValidationCode(email)
        if (result.error) {
            setError(result.message)
        }
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
            <Box  sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '22rem',                       
                        m: 2}}>
                <Box sx={{ fontSize: '2rem', fontWeight: 'semibold', mb: 2, textAlign:'center' }}>
                    Verify Email Address
                </Box>
                <Box sx={{padding: 1}}>Please check your email {email} to get verification code</Box>
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

                    <TextField
                        id="validate-code"
                        label="Code"
                        type="text"
                        variant="standard"
                        name="code"
                        value={code}
                        onChange={(e) => { handleInputChange(e); validateInput(e) }}
                        helperText={codeError || ' '}
                        error={!!codeError}
                    />
                    <Box>{!!error ? error : ' '}</Box>
                    <Box>{!!emailError ? emailError : ' '}</Box>
                    <Box sx={{ mt: 2 }}>
                        <Button variant="contained" type="submit" sx={{ width: '100%' }}>
                            Validate
                        </Button>
                    </Box>

                </Box>
                <Button variant="text" onClick={handleResendCode}>resend code</Button>
            </Box>
        </Box>
    )

}
export default EmailVerificationPage;