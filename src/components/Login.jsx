import React, { useState } from 'react';
import LoginCSS from "../styles/login.module.css";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Login() {

  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //to handle the login
  const login = async () => {

    const data = {
      email: email,
      password: password
    }

    try {
      const res = await fetch('/employees/login', {
        method: 'POST',
        dataType: 'json',
        headers: {
          'Accept': 'application/json',
          'content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      const resData = await res.json();
      console.log(resData);

      Cookies.set('user-role', resData.employee._id, { expires: 1 });

      if(resData.success && resData){
        navigate('/dashboard');
      }
      else{
        alert("Invalid Email or Password");
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  //to prevent default action of form
  const handleSubmit = (event) => {
    event.preventDefault();

    login();

    setEmail("");
    setPassword("");
  }

  return (
    <div className={LoginCSS.container}>
        <form action="" className={LoginCSS.form} onSubmit={handleSubmit}>
            <h1 className={LoginCSS.title}>Login</h1>
            <div className={LoginCSS.formDiv}>
                <label htmlFor="email">Email</label>
                <input type="email" name='email' placeholder='Enter Your Email Here' id='email-field' className={LoginCSS.input} 
                onChange={(event) => {setEmail(event.target.value)}} required/>
            </div>
            <div className={LoginCSS.formDiv}>
                <label htmlFor="password">Password</label>
                <input type="password" name='password' placeholder='Enter Your Password Here' id='password-field' className={LoginCSS.input} 
                onChange={(event) => {setPassword(event.target.value)}} required/>
            </div>
            <button className={LoginCSS.submitBtn} type="submit">SUBMIT</button>
        </form>
    </div>
  )
}

export default Login