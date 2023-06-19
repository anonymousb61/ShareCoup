import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase';
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate('/dashboard');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <div className='sign-up-container'>
      <form onSubmit={handleSignUp}>
        <h1>Sign Up</h1>
        <div>
        <input
          type="email"
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /></div>
        <div>
        <input
          type="password"
          placeholder='Enter your password'
          value={password}
          onChange={(e) => setPass(e.target.value)}
        /></div>
        <div className='sign-up-button-container'>
        <button type="submit" onClick={handleSignUp}>Sign up</button></div>
      </form>
      <p>Already have an account? <Link  to="/auth/login">Login here</Link></p>
    </div>
  );
}

export default SignUp;
