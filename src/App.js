import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import RegisterForm from './component/RegisterForm';
import EmailVerificationPage from './pages/EmailVerificationPage';

import ProductPage from './pages/ProductPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';

function App() {
  return (   
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
