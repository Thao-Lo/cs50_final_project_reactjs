import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";

function LoginForm({ authentication, handleInputChange, handleSubmit, error }) {
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false

    });
    const [usernameOrEmailError, setUsernameOrEmailError] = useState('');  
    const [passwordError, setPasswordError] = useState('');
   

    const validateInput = (event) => {
        const { name, value } = event.target;

        if (name === "usernameOrEmail") {
            if (value.length < 3) {
                setUsernameOrEmailError('Invalid Username or Email')
            } else if (value.length > 15) {
                setUsernameOrEmailError('Username must be less than 15 characters')
            } else {
                setUsernameOrEmailError('')
            }
        }      
        if (name === "password") {
            if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value)) {
                setPasswordError('Password must be at least 8 characters, one uppercase, one digit, one special character.')
            } else {
                setPasswordError('')
            }
        }
      
    }

    const handleClickShowPassword = (field) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field]
        }));
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };
    return (
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
                Login
            </Box>
            <TextField
                id="login-usernameOrEmail-input"
                label="Username Or Email"
                type="text"
                variant="standard"
                name="usernameOrEmail"
                value={authentication.usernameOrEmail}
                onChange={(e) => { handleInputChange(e); validateInput(e) }}
                helperText={usernameOrEmailError || ' '}
                error={!!usernameOrEmailError}

            />          
            <TextField
                id="login-password-input"
                label="Password"
                type={showPassword.password ? 'text' : 'password'}
                autoComplete="current-password"
                variant="standard"
                name="password"
                value={authentication.password}
                onChange={(e) => { handleInputChange(e); validateInput(e) }}
                helperText={passwordError || ' '}
                error={!!passwordError}
                slotProps={{
                    htmlInput: {
                        sx: { textAlign: 'left' },
                    },
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword.password ? 'hide the password' : 'display the password'
                                    }
                                    onClick={() => handleClickShowPassword('password')}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                >
                                    {showPassword.password ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                }}
            />          
            <Box>{!!error? error : ' '}</Box>
            <Box sx={{ mt: 2 }}>
                <Button variant="contained" type="submit" sx={{ width: '100%' }}>
                    Login
                </Button>
            </Box>           
        </Box>

    )
}

export default LoginForm;