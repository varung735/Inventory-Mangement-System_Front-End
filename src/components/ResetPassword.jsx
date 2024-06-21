import React, { useState } from 'react';
import ForgetPasswordCss from '../styles/forgetpassword.module.css';
import { patchRequest } from '../API/api';
import { routes_v_1 } from '../API/routes';
import { useNavigate } from 'react-router-dom';

function ResetPassword({ token, snackBar, setSuccess, setMessage }) {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');

  async function onSubmit() {

    if(password === '' || conPassword === '') {
      setSuccess(false);
      setMessage('Password canot be empty');
      snackBar();
      throw new Error('Password canot be empty');
    }

    if(password !== conPassword) {
      setSuccess(false);
      setMessage('Passwords donot match');
      snackBar();
      throw new Error('Password donot Match');
    }

    const response = await patchRequest(`${routes_v_1.user.resetPassword}?token=${token}`, { password: password });

    if(response.success){
      setSuccess(response.success);
      setMessage(response.message);
      snackBar();
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
    else{
      setSuccess(response.success);
      setMessage(response.message);
      snackBar();
      throw new Error(response.message);
    }
  }

  return (
    <div className={ForgetPasswordCss.form}>
        <h1 className={ForgetPasswordCss.title}>Forget Password</h1>
        <div className={ForgetPasswordCss.formHolder}>
            <label htmlFor='password'>Password</label>
            <input name='password' type="password" placeholder='Enter Your Password Here' id='password-field' className={ForgetPasswordCss.input}
                value={password} onChange={(event) => {setPassword(event.target.value)}} required />
        </div>
        <div className={ForgetPasswordCss.formHolder}>
            <label htmlFor='password'>Confirm Password</label>
            <input name='password' type="password" placeholder='Confirm Password' id='ocn-password-field' className={ForgetPasswordCss.input}
                value={conPassword} onChange={(event) => {setConPassword(event.target.value)}} required />
        </div>
        <div>
            <button className={ForgetPasswordCss.submit} onClick={() => {onSubmit()}}>SUBMIT</button>
        </div>
  </div>
  )
}

export default ResetPassword