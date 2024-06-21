import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminDasboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import VerifyEmail from './pages/VerifyEmail';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/verify/email' element={<VerifyEmail />} />
        <Route exact path='/forgot/password' element={<ForgotPassword />} />
        <Route exact path='/admin' element={<AdminDasboard />} />
        <Route exact path='/employee' element={<EmployeeDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
