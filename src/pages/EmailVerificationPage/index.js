import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { resendValidationCode, verifyEmail } from "../../services/authService";
import { useLocation, useNavigate } from "react-router-dom";

function EmailVerificationPage() {
     //get email from URL
    const location = useLocation();   
    const querySearch = new URLSearchParams(location.search);
    const email = querySearch.get('email');

    const [code, setCode] = useState('')
    const [codeError, setCodeError] = useState('');
    const [emailError, setEmailError] = useState('');

    const [error, setError] = useState('')
    const [isValid, setIsValid] = useState(false)
    const [message, setMessage] = useState(null)
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCode(value)
    }
    const validateInput = (e) => {
        const { name, value } = e.target;
        // use regex to validate code pattern
        if (name === 'code') {
            if (!/^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/.test(value)) {
                setCodeError('Email is not valid');
            } else {
                setCodeError('')
            }
        }
    }
    //submit code
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await verifyEmail(email, code)
        if (result.error) {
            setError(result.message)
            return;
        }
        setIsValid(true);
        setMessage(result.message)

    }

    // when user need to reset code, resend to their email
    const handleResendCode = async () => {
        if (!email) {
            setEmailError('Please enter valid email')
            return;
        } else {
            setEmailError('')
        }
        //call API to resend code
        const result = await resendValidationCode(email)
        if (result.error) {
            setError(result.message)
        }
    }
    // to hide enter code form, and show register successfully message, navigate to /login after 5 secs
    useEffect(() => {
        let timer;
        if (isValid) {
            timer = setTimeout(() => {
                navigate('/login')
            }, 5000)
        }
        return () => clearTimeout(timer)
    }, [isValid])

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '22rem',
                m: 2
            }}>
                <Box sx={{ fontSize: '2rem', fontWeight: 'semibold', mb: 2, textAlign: 'center' }}>
                    Verify Email Address
                </Box>
                <Box sx={{ padding: 2, pb: 0 }}>
                    <Typography sx={{mb:1}}> Please check your email to get verification code: </Typography>
                    <Typography> Email: {email}</Typography>                 
                </Box>
                {/* SHOW ENTER CODE FORM */}
                {!isValid && (
                    <>
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
                    </>
                )}
                  {/* SHOW SUCCESSFUL MESSAGE */}
                {isValid && (
                    <Typography sx={{ p: 3, color: 'green', fontSize: '1.25rem' }}>{message}</Typography>
                )}

            </Box>
        </Box>
    )

}
export default EmailVerificationPage;