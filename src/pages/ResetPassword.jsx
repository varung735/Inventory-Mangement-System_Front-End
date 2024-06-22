import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useQuery from '../hooks/useQuery';
import ForgetPasswordCss from '../styles/forgetpassword.module.css';
import SnackBar from '../components/SnackBar';
import { patchRequest } from '../API/api';
import { routes_v_1 } from '../API/routes';

function ResetPassword() {
    const navigate = useNavigate();
    const query = useQuery();
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');
    const [otp, setOtp] = useState();
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [viewSnackBar, setViewSnackBar] = useState(false);

    async function onSubmit() {

        if (password === '' || conPassword === '' || otp === 0) {
            setSuccess(false);
            setMessage('Password or otp cannot be empty');
            snackBar();
            throw new Error('Password or otp cannot be empty');
        }

        if (password !== conPassword) {
            setSuccess(false);
            setMessage('Passwords donot match');
            snackBar();
            throw new Error('Password donot Match');
        }
        
        const response = await patchRequest(`${routes_v_1.user.resetPassword}?token=${query.get('token')}&otp=${otp}`, { password: password });

        if (response.success) {
            setSuccess(response.success);
            setMessage(response.message);
            snackBar();
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
        else {
            setSuccess(response.success);
            setMessage(response.message);
            snackBar();
            throw new Error(response.message);
        }
    }

    function snackBar() {
        setViewSnackBar(true);
        setTimeout(() => {
            setViewSnackBar(false);
        }, 8000);
    }

    return (
        <div className={ForgetPasswordCss.container}>
            {viewSnackBar && <SnackBar success={success} message={message} viewSnackBar={viewSnackBar} setViewSnackbar={setViewSnackBar} />}
            <div className={ForgetPasswordCss.navbar}>
                <Link to={'/'}>
                    <img src="/images/arrow.svg" alt="arrow-left" className={ForgetPasswordCss.navbarImage} />
                </Link>
            </div>
            <div className={ForgetPasswordCss.body}>
                <div className={ForgetPasswordCss.formDiv}>
                    <div className={ForgetPasswordCss.form}>
                        <h1 className={ForgetPasswordCss.title}>Forget Password</h1>
                        <div className={ForgetPasswordCss.formHolder}>
                            <label htmlFor='otp'>OTP</label>
                            <input name='otp' type="number" placeholder='Enter Your Otp Here' id='otp-field' className={ForgetPasswordCss.input}
                                value={otp} onChange={(event) => { setOtp(event.target.value) }} required />
                        </div>
                        <div className={ForgetPasswordCss.formHolder}>
                            <label htmlFor='password'>Password</label>
                            <input name='password' type="password" placeholder='Enter Your Password Here' id='password-field' className={ForgetPasswordCss.input}
                                value={password} onChange={(event) => { setPassword(event.target.value) }} required />
                        </div>
                        <div className={ForgetPasswordCss.formHolder}>
                            <label htmlFor='password'>Confirm Password</label>
                            <input name='password' type="password" placeholder='Confirm Password' id='con-password-field' className={ForgetPasswordCss.input}
                                value={conPassword} onChange={(event) => { setConPassword(event.target.value) }} required />
                        </div>
                        <div>
                            <button className={ForgetPasswordCss.submit} onClick={() => { onSubmit() }}>SUBMIT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword