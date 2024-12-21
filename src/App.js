import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import RegisterForm from './component/RegisterForm';
import EmailVerificationPage from './pages/EmailVerificationPage';

import ProductPage from './pages/ProductPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AuthGuard from './component/AuthGuard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<AuthGuard><RegisterPage /></AuthGuard>} />
        <Route path="/verify-email" element={<AuthGuard><EmailVerificationPage /></AuthGuard>} />
        <Route path="/login" element={<AuthGuard><LoginPage /></AuthGuard>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
