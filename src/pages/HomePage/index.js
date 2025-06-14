import { useEffect, useState } from "react";
import { useUser } from "../../hooks/UserContext";
import { Box, Button, Container, Grid2, Typography } from "@mui/material";
import { getHomePage } from "../../services/authService";
import HomeScreen_Desktop from '../../static/images/homescreen_desktop.jpg'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Clock_Image from '../../static/images/clock.png'
import Google_Image from '../../static/images/google.png'
import Table_Image from '../../static/images/table.png'
import Phone_Image from '../../static/images/iphone.png'

const images = [{
    src: Clock_Image,
    alt: 'clock image',
    title: 'Real-time Booking'
}, {
    src: Google_Image,
    alt: 'google image',
    title: 'Quick Google Login'
}, {
    src: Phone_Image,
    alt: 'phone image',
    title: 'Easy Mobile Access'
}, {
    src: Table_Image,
    alt: 'table image',
    title: 'Table Management'
}]

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

    return (
        <>
            <Container maxWidth="xl" disableGutters>
                <Box sx={{
                    height: '90vh', display: 'flex', flexDirection: 'column', gap: '1rem'
                }}>
                    <Box sx={{
                        position: 'relative',
                        height: { xs: '60vh', sm: '65vh' },
                        overflow: 'hidden',
                        width: '100%',
                        backgroundImage: `url(${HomeScreen_Desktop})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Typography sx={{ textAlign: 'center', color: 'white', fontSize: { xs: '1.5rem', sm: '2.2rem', md: '3rem' }, fontWeight: 'bold', mb: '1.5rem' }}>
                            Smart Reservations Made Simple
                        </Typography>

                        <Box sx={{
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2rem',

                        }}>
                            <Typography sx={{ color: 'white', fontSize: { xs: '1.3rem', md: '1.5rem' }, fontWeight: 'semibold' }}>
                                Plan ahead with BookWise
                            </Typography>
                            <Button variant="contained" color="primary" size="large" startIcon={<DoubleArrowIcon />}
                                href="/booking"
                                sx={{ fontSize: { xs: '1.1rem', md: '1.2rem' }, fontWeight: 'bold' }}
                            >
                                {error? error : 'TRY BOOKING NOW'}

                            </Button>
                        </Box>
                    </Box>
                    <Grid2 container spacing={2}
                        sx={{ width: '100%', height: { xs: '30vh', sm: '25vh' }, display: 'flex', alignItems: 'center' }}>
                        {images.map(({ src, alt, title }) => (
                            <Grid2 size={{ xs: 6, sm: 3 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',justifyContent:'end', gap: '1rem'}}>
                                    <Box component='img'
                                        src={src}
                                        alt={alt}
                                        sx={{
                                            width: { xs: '50px', sm: '60px' },
                                            height: { xs: '50px', sm: '60px' }
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            textAlign: 'center',                                          
                                            fontSize: { xs: '1.1rem', sm: '1.2rem' },
                                            fontWeight: 600,
                                            color: '#424242'                                            
                                        }}>
                                        {title}
                                    </Typography>
                                </Box>
                            </Grid2>
                        ))}
                    </Grid2>

                </Box>


            </Container>
        </>

    )

}
export default HomePage;