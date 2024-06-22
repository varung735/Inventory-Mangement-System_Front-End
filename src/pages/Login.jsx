import React, { useState } from 'react';
import LoginCSS from "../styles/login.module.css";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { postRequest } from '../API/api';
import { routes_v_1 } from '../API/routes';
import SnackBar from '../components/SnackBar';

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [viewSnackBar, setViewSnackBar] = useState(false);

    const login = async () => {

        if(email === "" || password === ""){
            setSuccess(false);
            setMessage('Email or Password cannot be empty');
            snackBar();
            throw new Error('Email or Password cannot be empty');
        }

        const response = await postRequest(routes_v_1.user.login, {
            username_or_email: email,
            password: password
        });
        console.log(response);

        if(response.success) {
            
            if(!response.user.isEmailVerified) {
                setSuccess(response.success);
                setMessage(response.message);
                snackBar();
                setTimeout(() => {
                    navigate(`/verify/email?email=${email}`);
                }, 3000)
                return;
            }
            
            if(response.user.access === 'REVOKED') {
                setSuccess(response.success);
                setMessage(response.message);
                snackBar();
                throw new Error('Your access has been revoked, Consult with Admin or Sub-Admin');
            }

            
            if(response.user.role === 'ADMIN') {
                setSuccess(response.success);
                setMessage(response.message);
                snackBar();
                Cookies.set('token', response.token, { expires: 1 });
                Cookies.set('user', JSON.stringify(response.user), { expires: 1 });
                navigate('/admin');
            }
            else if(response.user.role === 'EMPLOYEE') {
                setSuccess(response.success);
                setMessage(response.message);
                snackBar();
                Cookies.set('token', response.token, { expires: 1 });
                Cookies.set('user', JSON.stringify(response.user), { expires: 1 });
                navigate('/employee');
            }
            else {
                setSuccess(response.success);
                setMessage(response.message);
                snackBar();
                throw new Error(response.message);
            }
        }
    }

    function snackBar() {
        setViewSnackBar(true);
        setTimeout(() => {
          setViewSnackBar(false);
        }, 8000);
    }

    const handleSubmit = () => {
        login();
    }

    return (
        <div className={LoginCSS.container}>
            { viewSnackBar && <SnackBar success={success} message={message} viewSnackBar={viewSnackBar} setViewSnackbar={setViewSnackBar} /> }
            <div className={LoginCSS.form}>
                <h1 className={LoginCSS.title}>Login</h1>
                <div className={LoginCSS.formDiv}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' placeholder='Enter Your Email Here' id='email-field' className={LoginCSS.input}
                        value={email} onChange={(e) => {setEmail(e.target.value)}} required />
                </div>
                <div className={LoginCSS.formDiv}>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' placeholder='Enter Your Password Here' id='password-field' className={LoginCSS.input}
                        value={password} onChange={(e) => {setPassword(e.target.value)}} required />
                </div>
                <button className={LoginCSS.submitBtn} onClick={() => handleSubmit()}>SUBMIT</button>
                <Link to={'/forgot/password'} className={LoginCSS.forgotPassword} >Forgot Password?</Link>
            </div>
        </div>
    )
}

export default Login