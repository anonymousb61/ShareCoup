import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import TitleBar from './titlebar';
import { collection } from 'firebase/firestore';


const ProfilePage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userCoupons, setUserCoupons] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        fetchUserCoupons(user.uid);
        console.log(user.uid);
      } else {
        setUserEmail('');
        setUserCoupons([]);
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

  const fetchUserCoupons = async (userid) => {
    try {
      // const snapshot = await db.collection('codes')
      //   .where('userId', '==', userid)
      //   .get();
      const codesRef = db.collection('codes');
      const codesUser = await codesRef.where('userId','==',userid).get()
        if(codesUser.empty){
          console.log('no matchingh doc');return;
        }

        codesUser.forEach(doc =>{console.log(doc.id, '=>', doc.data())})

      // const userCouponData = snapshot.docs.map((doc) => ({
      //   id: doc.id,
      //   ...doc.data()
      // }));
     // setUserCoupons(userCouponData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>
      {userEmail ? (
        <>
          <p>Email: {userEmail}</p>
          <button onClick={handleSignOut}>Sign Out</button>
          <h2>Your Uploaded Coupons</h2>
          {userCoupons.length > 0 ? (
            <ul>
              {userCoupons.map((coupon) => (
                <li key={coupon.id}>
                  <div>
                    <p>Code: {coupon.code}</p>
                    <p>Description: {coupon.description}</p>
                    <p>Company Name: {coupon.companyName}</p>
                    <p>
                      Expiration Date:{' '}
                      {coupon.expirationDate?.toDate().toLocaleString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No coupons found</p>
          )}
        </>
      ) : (
        <p>No user signed in</p>
      )}
    </div>
  );
};

export default ProfilePage;
