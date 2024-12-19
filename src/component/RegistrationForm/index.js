import { Box, filledInputClasses, FormControl, FormHelperText, IconButton, Input, InputAdornment, inputBaseClasses, InputLabel, TextField } from "@mui/material";
import { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



function RegistrationForm() {
    const [authentication, setAuthentication] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState({
        password : false,
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
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off">
            <TextField
                id="username-input"
                label="Username"
                type="text"
                variant="standard"
            />
            <TextField
                id="email-input"
                label="Email"
                type="email"
                variant="standard"
                slotProps={{
                    htmlInput: {
                        sx: { textAlign: 'right' },
                    },
                    input: {
                        endAdornment: (
                            <InputAdornment
                                position="end"
                                sx={{
                                    alignSelf: 'flex-end',
                                    opacity: 0,
                                    pointerEvents: 'none',
                                    [`.${filledInputClasses.root} &`]: {
                                        marginBottom: '7.5px',
                                    },
                                    [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                                        opacity: 1,
                                    },
                                }}
                            >
                                @gmail.com
                            </InputAdornment>
                        ),
                    },
                }}
            />
            <TextField
                id="password-input"
                label="Password"
                type={showPassword.password ? 'text' : 'password'}
                autoComplete="current-password"
                variant="standard"
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
                                    {showPassword.password ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                }}
            />
            <TextField
                id="confirm-password-input"
                label="Confirm Password"
                type={showPassword.confirmPassword ? 'text' : 'password'}
                autoComplete="current-password"
                variant="standard"
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
                                    {showPassword.confirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                }}
            />

        </Box>
    )
}

export default RegistrationForm;