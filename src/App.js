import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminDasboard from './pages/AdminDashboard';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import VerifyEmail from './pages/VerifyEmail';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/admin/Home';
import Sales from './pages/admin/Sales';
import Stock from './pages/admin/Stock';
import Users from './pages/admin/Users';
import BillingDashboard from './pages/BillingDashboard';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/verify/email' element={<VerifyEmail />} />
        <Route exact path='/reset/password' element={<ResetPassword />} />
        <Route exact path='/forgot/password' element={<ForgotPassword />} />
        <Route exact path='/admin' element={<AdminDasboard />} >
          <Route exact path='home' element={<Home />} />
          <Route exact path='sales' element={<Sales />} />
          <Route exact path='stock' element={<Stock />} />
          <Route exact path='users' element={<Users />} />
        </Route>
        <Route exact path='/billing' element={<BillingDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
