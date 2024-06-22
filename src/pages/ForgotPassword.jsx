import React, { useState } from 'react';
import ForgetPasswordCss from '../styles/forgetpassword.module.css';
import { Link } from 'react-router-dom';
import SnackBar from '../components/SnackBar';
import { getRequest } from '../API/api';
import { routes_v_1 } from '../API/routes';

function ForgotPassword() {
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [viewSnackBar, setViewSnackBar] = useState(false);

  const [email, setEmail] = useState("");

  async function onSubmit() {

    if (email === "") {
      setSuccess(false);
      setMessage('Email cannot be empty');
      snackBar();
      throw new Error('Email cannot be empty');
    }

    const response = await getRequest(`${routes_v_1.user.forgetPassword}?email=${email}`);

    if (response.success) {
      setSuccess(!success);
      setMessage(response.message);
      snackBar();
    }
    else {
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
              <label htmlFor='email'>Email</label>
              <input name='email' type="email" placeholder='Enter Your Email Here' id='email-field' className={ForgetPasswordCss.input}
                value={email} onChange={(event) => { setEmail(event.target.value) }} required />
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

export default ForgotPassword