import React, { useState } from 'react';
import ForgetPasswordCss from '../styles/forgetpassword.module.css';
import { Link } from 'react-router-dom';
import ForgotPasswordEmail from '../components/ForgotPasswordEmail';
import ResetPassword from '../components/ResetPassword';
import SnackBar from '../components/SnackBar';

function ForgotPassword() {
  const [component, setComponent] = useState('forgotPasswordEmail');
  const [token, setToken] = useState('')
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [viewSnackBar, setViewSnackBar] = useState(false);

  function snackBar() {
    setViewSnackBar(true);
    setTimeout(() => {
      setViewSnackBar(false);
    }, 8000);
  }

  return (
    <div className={ForgetPasswordCss.container}>
      { viewSnackBar && <SnackBar success={success} message={message} viewSnackBar={viewSnackBar} setViewSnackbar={setViewSnackBar} />}
      <div className={ForgetPasswordCss.navbar}>
        <Link to={'/'}>
          <img src="/images/arrow.svg" alt="arrow-left" className={ForgetPasswordCss.navbarImage} />
        </Link>
      </div>
      <div className={ForgetPasswordCss.body}>
        <div className={ForgetPasswordCss.formDiv}>
          { component === 'forgotPasswordEmail' && <ForgotPasswordEmail
             success={success} 
             setSuccess={setSuccess} 
             token={token} 
             setToken={setToken} 
             setComponent={setComponent}
             snackBar={snackBar}
             setMessage={setMessage} /> }
          { component === 'resetPassword' && <ResetPassword 
            setSuccess={setSuccess} 
            token={token} 
            snackBar={snackBar}
            setMessage={setMessage} /> }
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword