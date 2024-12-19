import { Box, Button, filledInputClasses, FormControl, FormHelperText, IconButton, Input, InputAdornment, inputBaseClasses, InputLabel, TextField } from "@mui/material";
import { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


function RegisterForm() {
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false

    });
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
        <Box component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '20rem',
                m: 2,
                '& .MuiTextField-root': { m: 1, width: '100%' }
            }}
            noValidate
            autoComplete="off">

            <Box sx={{ fontSize: '1.5rem', fontWeight: 'bold', mb: 1 }}>
                Register New User
            </Box>
            <TextField
                id="register-username-input"
                label="Username"
                type="text"
                variant="standard"
                helperText="Incorrect entry."
            />
            <TextField
                id="register-email-input"
                label="Email"
                type="email"
                variant="standard"
                helperText="Incorrect entry."
            />
            <TextField
                id="register-password-input"
                label="Password"
                type={showPassword.password ? 'text' : 'password'}
                autoComplete="current-password"
                variant="standard"
                helperText="Incorrect entry."
                slotProps={{
                    htmlInput: {
                        sx: { textAlign: 'right' },
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
            <TextField
                id="register-confirm-password-input"
                label="Confirm Password"
                type={showPassword.confirmPassword ? 'text' : 'password'}
                autoComplete="current-password"
                variant="standard"
                helperText="Incorrect entry."
                slotProps={{
                    htmlInput: {
                        sx: { textAlign: 'right' },
                    },
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword.confirmPassword ? 'hide the confirm password' : 'display the confirm password'
                                    }
                                    onClick={() => handleClickShowPassword('confirmPassword')}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                >
                                    {showPassword.confirmPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                }}
            />
            <Box sx={{ mt: 2 }}>
                <Button variant="contained" type="submit" sx={{ width: '100%' }}>
                    Register
                </Button>
            </Box>

        </Box>

    )
}

export default RegisterForm;

//Registration Form
// RegistrationPage
//authService -> RegisterUser LoginUser