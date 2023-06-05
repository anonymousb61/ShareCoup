import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
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
        <button type="submit">Sign up</button></div>
      </form>
      
    </div>
  );
}

export default SignUp;
