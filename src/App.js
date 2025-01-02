import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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


function App() {
  return (
    <StripeProvider>
      <ReservationProvider>
        <BrowserRouter>
          <NavBarReservation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route element={<AuthGuard />}>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/verify-email" element={<EmailVerificationPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path='/user/reservation' element={<ReservationPage />} />
            <Route path="/user/reservation/payment-complete" element={<PaymentCompletePage />} />
          </Routes>
        </BrowserRouter>
      </ReservationProvider>
    </StripeProvider>

  );
}

export default App;
