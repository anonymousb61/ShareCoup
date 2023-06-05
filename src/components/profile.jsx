import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';

const ProfilePage = () => {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
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
    </div>
  );
};

export default ProfilePage;
