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
            <Link className="profileItem" to="/yourUploaded">Your Uploaded</Link>
            <Link className="profileItem" to="/yourUsedCoupons">Your Used Coupons</Link>
          </div>
    </div>
  );
};

export default ProfilePage;
