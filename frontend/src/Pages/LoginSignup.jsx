import React, { useState } from 'react'
import './CSS/LoginSignup.css'
export const LoginSignup = () => {

  const [state,setState] = useState("Login");
  const [formData,setFormData] = useState({
    username :"",
    password:"",
    email:""
  })

  const changeHandler = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
 const login = async () =>{
       console.log("Login Function Executed",formData);
       let responseData;
  try {
    const response = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    responseData = await response.json();

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    } else {
      alert(responseData ? responseData.errors : 'Unknown error occurred.');
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred during sign up.');
  }
 }

 const signup = async () => {
  console.log("Sign Up Function Executed", formData);
  let responseData;
  try {
    const response = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    responseData = await response.json();

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    } else {
      alert(responseData ? responseData.errors : 'Unknown error occurred.');
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred during sign up.');
  }
};

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
         {state==="Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' />:<></>} 
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={changeHandler} type="passward" placeholder='Passward' />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state==="Sign Up"
        ? <p className="loginsignup-login">Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span></p>
      :<p className="loginsignup-login">Create an account? <span onClick={()=>{setState("Sign Up")}}>Click here</span></p>}
       
        
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  )
}
