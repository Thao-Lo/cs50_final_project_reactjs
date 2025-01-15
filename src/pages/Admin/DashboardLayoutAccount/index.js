import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import HomePage from '../../HomePage';
import DateListPage from '../DateListPage';
import ReservationManagementPage from '../ReservationManagementPage';
import SeatListPage from '../SeatListPage';
import SlotListPage from '../SlotListPage';
import UserManagementPage from '../UserManagementPage';
import PeopleIcon from '@mui/icons-material/People';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AppsIcon from '@mui/icons-material/Apps';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';

const demoTheme = createTheme({
    cssVariables: { colorSchemeSelector: 'data-toolpad-color-scheme', },
    colorSchemes: { light: true, dark: true },
    breakpoints: { values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536, }, },
});

const NAVIGATION = [
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        kind: 'header',
        title: 'User Items',
      },
    {
        segment: 'user-management',
        title: 'User Management',
        icon: <PeopleIcon />,
    },
    {
        kind: 'header',
        title: 'Booking Items',
      },
    {
        segment: 'seat-list',
        title: 'Seat List',
        icon: <TableRestaurantIcon />,
    },
    {
        segment: 'date-list',
        title: 'Date List',
        icon: <CalendarMonthIcon />,
    },
    {
        segment: 'slot-list',
        title: 'Slot List',
        icon: <AppsIcon />,
    },
    {
        kind: 'header',
        title: 'Reservation Items',
      },
    {
        segment: 'reservation-list',
        title: 'Reservation List',
        icon: <DinnerDiningIcon />,
    },
];

function DashboardLayoutAccount() {
    const router = useDemoRouter('/admin/dashboard');

    const renderComponent = () => {
        switch (router.pathname) {
            case '/dashboard':
                return <HomePage />;
            case '/user-management':
                return <UserManagementPage />;
            case '/seat-list':
                return <SeatListPage />;
            case '/date-list':
                return <DateListPage />;
            case '/slot-list':
                return <SlotListPage />;
            case '/reservation-list':
                return <ReservationManagementPage />;
            default:
                return <HomePage />;
        }
    }

    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}
            branding={{
                title: 'ZAVIS',
                homeUrl: '/dashboard',
            }}
        >
            <DashboardLayout>
                {/* {router.pathname} */}
                {renderComponent()}
            </DashboardLayout>
        </AppProvider>
    );
}

export default DashboardLayoutAccount;
