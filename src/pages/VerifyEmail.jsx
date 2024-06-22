import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useQuery from '../hooks/useQuery';
import ForgetPasswordCss from '../styles/forgetpassword.module.css';
import SnackBar from '../components/SnackBar';
import { getRequest, patchRequest } from '../API/api';
import { routes_v_1 } from '../API/routes';

function VerifyEmail() {
  const query = useQuery();
  const navigate = useNavigate();
  const [otp, setOtp] = useState();
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [viewSnackBar, setViewSnackBar] = useState(false);

  useEffect(() => {
    sendVerificationLink();
    // eslint-disable-next-line
  }, []);

  async function sendVerificationLink() {
    const response = await getRequest(`${routes_v_1.user.sendverificationLink}?email=${query.get('email')}`);
    console.log(query.get('email'));
    console.log(response);

    if(response.success){
      setSuccess(response.success);
      setMessage(response.message);
      snackBar();
    }
    else {
      setSuccess(response.success);
      setMessage(response.message);
      snackBar();
    }
  }

  async function onSubmit() {

    if (otp === 0) {
      setSuccess(false);
      setMessage('otp cannot be empty');
      snackBar();
      throw new Error('otp cannot be empty');
    }

    const response = await patchRequest(`${routes_v_1.user.verifyEmail}?token=${query.token}`, { otp: otp });
    
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
            <h1 className={ForgetPasswordCss.title}>Verify Your Email</h1>
            <div className={ForgetPasswordCss.formHolder}>
              <label htmlFor='otp'>OTP</label>
              <input name='otp' type="number" placeholder='Enter Your Otp Here' id='otp-field' className={ForgetPasswordCss.input}
                value={otp} onChange={(event) => { setOtp(event.target.value) }} required />
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

export default VerifyEmail