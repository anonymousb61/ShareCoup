
import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const SignInWithGoogle = async() =>{
    try{
    await signInWithPopup(auth, googleProvider)

  }
catch (err){
  console.log(err);
};
}

  return (
    <div className='sign-in-container'>
      <form onSubmit={handleSignIn}>
        <h1>Log In</h1>
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
        <div className='log-in-button-container'>
        <button type="submit">Log in</button></div>
      </form>
      <div className='sign-in-with-google-container'>
      <button className = 'googleButton-container' onClick ={SignInWithGoogle}> Sign in with google</button>
      </div> </div>
  );
}

export default SignIn;
