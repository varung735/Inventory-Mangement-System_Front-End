import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from "axios";
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

function App() {

  axios.defaults.baseURL = "https://ims-backend-3u4x.onrender.com";

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
      // <Dashboard />
      // <Login />
  );
}

export default App;
