import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";


function RegisterForm({ authentication, handleInputChange, handleSubmit }) {
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false

    });
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const validateInput = (event) => {
        const { name, value } = event.target;      

        if (name === "username") {
            if (value.length < 3) {
                setUsernameError('Username must be at least 3 characters')
            } else if (value.length > 15) {
              setUsernameError('Username must be less than 15 characters')
            }else{
                setUsernameError('')
            }
        }

        if (name === "email") {
            if (!/^[\w-\.]+@([\w-]+\.)+[a-zA-Z]{2,}$/.test(value)){
                setEmailError('Email is not valid');
            }else{
                setEmailError('')
            }
        }
        if (name === "password") {
            if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value)){
               setPasswordError('Password must be at least 8 characters, one uppercase, one digit, one special character.')
            }else{
                setPasswordError('')
            }
        }
        if(name === "confirmPassword"){
            if(value !== authentication.password){
                setConfirmPasswordError('Password must match')
            }else{
                setConfirmPasswordError('')
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
            '& .MuiTextField-root': {width: '100%' }
        }}
        noValidate
        autoComplete="off">

        <Box sx={{ fontSize: '1.5rem', fontWeight: 'bold', mb: 2 }}>
            Register New User
        </Box>
        <TextField
            id="register-username-input"
            label="Username"
            type="text"
            variant="standard"
            name="username"
            value={authentication.username}
            onChange={(e) => { handleInputChange(e); validateInput(e) }}
            helperText={usernameError  || ' '}
            error={!!usernameError}
           
        />
        <TextField
            id="register-email-input"
            label="Email"
            type="email"
            variant="standard"
            name="email"
            value={authentication.email}
            onChange={(e) => { handleInputChange(e); validateInput(e) }}
            helperText={emailError || ' '}
            error={!!emailError}
        />
        <TextField
            id="register-password-input"
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
        <TextField
            id="register-confirm-password-input"
            label="Confirm Password"
            type={showPassword.confirmPassword ? 'text' : 'password'}
            autoComplete="current-password"
            variant="standard"
            name="confirmPassword"
            value={authentication.confirmPassword}
            onChange={(e) => { handleInputChange(e); validateInput(e) }}
            helperText={confirmPasswordError || ' '}
            error={!!confirmPasswordError}
            slotProps={{
                htmlInput: {
                    sx: { textAlign: 'left' },
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