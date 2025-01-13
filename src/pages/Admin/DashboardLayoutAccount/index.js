import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDemoRouter } from '@toolpad/core/internal';
import { Outlet, useNavigate } from 'react-router-dom';

const NAVIGATION = [
    {
        segment: 'admin/dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'admin/dashboard/user-management',
        title: 'User Management',
        icon: <ShoppingCartIcon />,
    },
    {
        segment: 'admin/dashboard/slot-list',
        title: 'Slot List',
        icon: <ShoppingCartIcon />,
    },
];

const demoTheme = createTheme({
    cssVariables: { colorSchemeSelector: 'data-toolpad-color-scheme',},
    colorSchemes: { light: true, dark: true },
    breakpoints: { values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536,},},
});


function DashboardLayoutAccount() {    
    const navigate = useNavigate();
    const router = useDemoRouter('./admin/dashboard/');

    const handleNavigation = (path) =>{
        navigate(path)
    }
    const fixNavigation = NAVIGATION.map((item) => ({
        ...item,
        onClick : () => handleNavigation(item.segment)
    }))
    return (
        // preview-start
        <AppProvider          
            navigation={fixNavigation}
            router={router}
            theme={demoTheme}            
        >
            <DashboardLayout>
                <Outlet/>                
            </DashboardLayout>
        </AppProvider>
        // preview-end
    );

    // function DemoPageContent({ pathname }) {
//     return (
//         <Box
//             sx={{
//                 py: 4,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 textAlign: 'center',
//             }}
//         >
//             <Typography>Dashboard content for {pathname}</Typography>
//         </Box>
//     );
// }
// DemoPageContent.propTypes = {
//     pathname: PropTypes.string.isRequired,
// };

}

export default DashboardLayoutAccount;
