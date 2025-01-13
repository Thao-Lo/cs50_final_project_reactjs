import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { USER_ACTION, useUser } from '../../hooks/UserContext';
import { logout } from '../../services/authService';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

const pages = [{
    route: '/',
    label: 'Home'
},
{
    route: '/booking',
    label: 'Booking'
},
{
    route: 'user/reservation',
    label: 'Reservation'
},
{
    route: '/admin/dashboard',
    label: 'Dashboard'
}, {
    route: '/user/profile',
    label: 'My Account'
},
{
    route: '/login',
    label: 'Login'
}, {
    route: '',
    label: 'Logout'
}
];
function NavBarReservation() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const { state: { error, user, isAuthenticated }, dispatch } = useUser();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    //remove Cookies and reset to initialState in UserContext
    const handleMenuClick = (label) => {
        if (label === 'Logout') {
            dispatch({ type: USER_ACTION.LOGOUT })
            logout();
        }
    }
    const getFilteredPages = () => {
        //if user not login
        if (!isAuthenticated) {
            return pages.filter(({ label }) => !['My Account','Reservation', 'Dashboard', 'Logout'].includes(label))
        }
        //if user login and have role "ADMIN"
        if (user?.role === 'ADMIN') {
            return pages.filter(({ label }) => !['My Account','Reservation', 'Booking', 'Login'].includes(label))
        }
        //role "GUEST"
        return pages.filter(({ label }) => label !== 'Login' && label !== 'Dashboard')
    }
    const filteredPages = getFilteredPages();

    // for Mobile view
    const renderMenuItems = () => {
        return filteredPages.map(({ label, route }) => (
            <MenuItem key={label} onClick={() => { handleCloseNavMenu(); handleMenuClick(label) }}>
                <Typography
                    component={NavLink} to={route}
                    sx={{ textAlign: 'center', textDecoration: 'none', color: 'inherit' }}>
                    {label}
                </Typography >
            </MenuItem>
        ))
    }
    //for desktop view 
    const renderButtonItems = () => {
        return filteredPages.map(({ label, route }) => (
            <Button
                component={NavLink}
                to={route}
                key={label}
                onClick={() => { handleCloseNavMenu(); handleMenuClick(label) }}
                sx={{ my: 2, color: 'white', display: 'block' }}
            >
                {label}
            </Button>
        ))
    }
    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <AllInclusiveIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Zavis
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {/* MOBILE VIEW */}
                            {renderMenuItems()}
                        </Menu>
                    </Box>
                    <AllInclusiveIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Zavis
                    </Typography>
                    {/* DESKTOP VIEW */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {renderButtonItems()}

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default NavBarReservation;