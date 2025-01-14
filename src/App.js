import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import EmailVerificationPage from './pages/EmailVerificationPage';
import ProductPage from './pages/ProductPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AuthGuard from './component/AuthGuard';
import BookingPage from './pages/BookingPage';
import ReservationPage from './pages/ReservationPage';
import { ReservationProvider } from './hooks/ReservationContext';
import { StripeProvider } from './stripe/StripeContext';
import PaymentCompletePage from './pages/PaymentCompletePage';
import NavBarReservation from './component/NavBarReservation';
import { UserProvider } from './hooks/UserContext';
import UserPage from './pages/UserPage';
import RoleGuard from './component/RoleGuard';
import DashboardLayoutAccount from './pages/Admin/DashboardLayoutAccount';
import UserManagementPage from './pages/Admin/UserManagementPage';


function App() {
  return (
    <StripeProvider>
      <UserProvider>
        <ReservationProvider>
          <BrowserRouter>
            <NavBarReservation />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
              <Route path="/booking" element={<BookingPage />} />

              <Route element={<AuthGuard />}>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/verify-email" element={<EmailVerificationPage />} />
                <Route path="/login" element={<LoginPage />} />
              </Route>

              {/* User Routes*/}
              <Route path="/user/*" element={<RoleGuard allowedRole={['USER']} />}>
                <Route path='reservation' element={<ReservationPage />} />
                <Route path="reservation/payment-complete" element={<PaymentCompletePage />} />
                <Route path="profile" element={<UserPage />} />
              </Route>
              <Route path="/admin/*" element={<RoleGuard allowedRole={['ADMIN']} />}>
                <Route path="dashboard" element={<DashboardLayoutAccount />}>
                  {/* <Route path='user-management' element={<UserManagementPage />} />
                  <Route path='*' element={<HomePage />}/> */}
                </Route>
              </Route>

            </Routes>
          </BrowserRouter>
        </ReservationProvider>
      </UserProvider>
    </StripeProvider>

  );
}

export default App;
