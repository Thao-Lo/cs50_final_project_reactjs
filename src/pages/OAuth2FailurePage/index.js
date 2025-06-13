import { TextDecreaseOutlined } from "@mui/icons-material";
import { Box, Container, Typography } from "@mui/material";
import { NavLink, useSearchParams } from "react-router-dom";


function OAuth2FailurePage() {
    const [searchParam] = useSearchParams();

    const errorMessage = searchParam.get("error");

    return (
        <Container maxWidth='lg' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
            <Box sx={{ width: '20rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Box >
                    {errorMessage ? (
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography sx={{ color: '#f44336', fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>
                                Whoops!
                            </Typography>
                            <Typography>{errorMessage}</Typography>
                        </Box>
                    ) : (
                        <Box>Fail to login with Google</Box>
                    )}
                </Box>
                <Box sx={{ display: 'flex', gap: '3px', justifyContent: 'center' }}>
                    <Typography>Login with different account? </Typography>
                    <Typography component={NavLink} to='/login'
                        sx={{ textDecoration: 'none', color: '#0091ea', '&:hover': { color: '#40c4ff' } }}>
                        Try again</Typography>
                </Box>
            </Box>
        </Container>
    );

}
export default OAuth2FailurePage;