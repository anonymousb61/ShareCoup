import React from 'react';
import { auth } from '../../firebase';
import { Navigate, useNavigate } from 'react-router-dom';


const SignOut = () => {
  const navigate  = useNavigate();
  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        // Sign-out successful
        console.log('User signed out');
        navigate('/')
      })

      .catch((error) => {
        // An error occurred during sign-out
        console.log(error);
      });
  };

  return (
    <div className='sign-out-button-container'>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default SignOut;
