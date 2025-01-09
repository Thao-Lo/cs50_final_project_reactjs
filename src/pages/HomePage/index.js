import { useEffect, useState } from "react";
import { useUser } from "../../hooks/UserContext";
import { Box, Container, Typography } from "@mui/material";
import { getHomePage } from "../../services/authService";
import AppronImage from '../../static/images/appron.png'

function HomePage() {
    const { state: { isAuthenticated }, dispatch } = useUser();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('')

    const fetchHomePage = async () => {
        try {
            const result = await getHomePage();
            if (result.error) {
                setError(result.message);
                return;
            }
            setMessage(result.message);
        } finally {
            setIsLoading(false); // Ensure loading is set to false after the API call
        }
    }
    useEffect(() => {
        if (!isAuthenticated) {

        }
        fetchHomePage()
    }, [isAuthenticated])

    if (isLoading) {
        return <Typography variant="subtitle1">Loading Home page...</Typography>;
    }
    if (error) {
        return <Typography variant="subtitle1">{error}...</Typography>;
    }

    return (
        <>
            <Container maxWidth="lg">
                <Box sx={{mt:2, height: '90vh', display: 'flex', alignItems: 'center', justifyContent:{xs:'center'}, flexDirection: { xs: 'column', sm: 'row' }}}>
                    <Box sx={{ display: 'flex', alignContent: 'center', justifyContent:'center'}}>
                        <Typography sx={{fontSize: {xs: '1.5rem', sm: '2.5rem'}, textAlign:'center'}}>{message}</Typography>
                    </Box>
                    <Box
                        component='img'
                        sx={{
                            width:{xs: 350, sm: 500},                            
                            height: {xs: 350, sm: 500}
                        }}
                        alt='Appron image'
                        src={AppronImage}
                    />
                </Box>

            </Container>
        </>

    )

}
export default HomePage;