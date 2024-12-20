import './App.css';
import RegisterForm from './component/RegisterForm';
import EmailVerificationPage from './pages/EmailVerificationPage';

import ProductPage from './pages/ProductPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <div className="App">
    <RegisterPage/>
    <EmailVerificationPage/>
    </div>
  );
}

export default App;
