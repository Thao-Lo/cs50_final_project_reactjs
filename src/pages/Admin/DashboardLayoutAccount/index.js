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
import HomePage from '../../HomePage';
import UserManagementPage from '../UserManagementPage';

const demoTheme = createTheme({
    cssVariables: { colorSchemeSelector: 'data-toolpad-color-scheme',},
    colorSchemes: { light: true, dark: true },
    breakpoints: { values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536,},},
});

const NAVIGATION = [
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'user-management',
        title: 'User Management',
        icon: <ShoppingCartIcon />,
    },
    {
        segment: 'slot-list',
        title: 'Slot List',
        icon: <ShoppingCartIcon />,
    },
];

function DashboardLayoutAccount() {      
    const router = useDemoRouter('/admin/dashboard');

    const renderComponent = () => {
        switch(router.pathname) {
            case '/dashboard': 
            return <HomePage/>;
            case '/user-management': 
            return <UserManagementPage/>;
            default:
                return <HomePage/>;
        }
    }

    return (        
        <AppProvider          
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}            
        >
            <DashboardLayout>
                {router.pathname}
               {renderComponent()}                 
            </DashboardLayout>
        </AppProvider>   
    );
}

export default DashboardLayoutAccount;
