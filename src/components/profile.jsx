import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, getAuth } from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import YourUploaded from './yourUploaded';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [userEmail, setUserEmail] = useState('');
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        console.log(user.uid);
      } else {
        setUserEmail('');
        
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Sign out successful');
      })
      .catch((error) => {
        console.log(error);
      });
  };

 

  


    

    
 

  return (
    <div>
      <h1>Profile Page</h1>
      {userEmail ? (
        <>
          <p>Email: {userEmail}</p>
          <button onClick={handleSignOut}>Sign Out</button>
         
           

          
        </>
      ) : (
        <p>No user signed in</p>
      )}
<div className="profileLinks">
         <p className="profileItem">  <Link className='profileItemLink' to="/yourUploaded">Your Uploaded Coupons</Link>
         </p> <p className="profileItem">  <Link className='profileItemLink' to="/yourUsedCoupons">Your Used Coupons</Link>
         </p></div>
    </div>
  );
};

export default ProfilePage;
