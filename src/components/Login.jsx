import React from 'react';
import LoginCSS from "../styles/login.module.css";

function Login() {
  return (
    <div className={LoginCSS.container}>
        <form action="" className={LoginCSS.form}>
            <h1 className={LoginCSS.title}>Login</h1>
            <div className={LoginCSS.formDiv}>
                <label htmlFor="email">Email</label>
                <input type="email" name='email' placeholder='Enter Your Email Here' id='email-field' className={LoginCSS.input} required/>
            </div>
            <div className={LoginCSS.formDiv}>
                <label htmlFor="password">Password</label>
                <input type="password" name='password' placeholder='Enter Your Password Here' id='password-field' className={LoginCSS.input} required/>
            </div>
            <button className={LoginCSS.submitBtn}>SUBMIT</button>
        </form>
    </div>
  )
}

export default Login