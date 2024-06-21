import React, { useState } from 'react';
import ForgetPasswordCss from '../styles/forgetpassword.module.css';
import { getRequest } from '../API/api';
import { routes_v_1 } from '../API/routes';

function ForgotPasswordEmail({ success, setSuccess, setComponent, setToken, snackBar, setMessage }) {
  const [email, setEmail] = useState("");

  async function onSubmit() {
    
    if(email === "") {
        setSuccess(false);
        setMessage('Email cannot be empty');
        snackBar();
        throw new Error('Email cannot be empty');
    }

    const response = await getRequest(`${routes_v_1.user.forgetPassword}?email=${email}`);

    if(response.success) {
        setSuccess(!success);
        setToken(response.token);
        setComponent('resetPassword');
        setMessage(response.message);
        snackBar();
    }
    else {
        setMessage(response.message);
        snackBar();
        throw new Error(response.message);
    }
  }

  return (
    <div className={ForgetPasswordCss.form}>
        <h1 className={ForgetPasswordCss.title}>Forget Password</h1>
        <div className={ForgetPasswordCss.formHolder}>
            <label htmlFor='email'>Email</label>
            <input name='email' type="email" placeholder='Enter Your Email Here' id='email-field' className={ForgetPasswordCss.input}
                value={email} onChange={(event) => {setEmail(event.target.value)}} required />
        </div>
        <div>
            <button className={ForgetPasswordCss.submit} onClick={() => {onSubmit()}}>SUBMIT</button>
        </div>
  </div>
  )
}

export default ForgotPasswordEmail