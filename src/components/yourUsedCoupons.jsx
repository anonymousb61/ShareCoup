import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, getAuth } from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';

const YourUsedCoupons = () => {
  const [userEmail, setUserEmail] = useState('');
  
  const [usedCoupons, setUsedCoupons] =useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        console.log(user.uid);
      } else {
        setUserEmail('');
       
        setUsedCoupons([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  

  

  useEffect(() => {
    
    const fetchUsedCoupons = async (userId) => {
      try {
        const q = query(collection(db, 'codes'), where('usedByUserId', '==', userId));
        const querySnapshot = await getDocs(q);
        const usedCouponData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsedCoupons(usedCouponData);
      } catch (error) {
        console.error(error);
      }
    };


    const authInstance = getAuth();
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      if (user) {
        const userId = user.uid; // Retrieve the user ID from the user object
        
        fetchUsedCoupons(userId)
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
     
           <h2 className='usedCoupHeading'>Your Used Coupons</h2>
          {usedCoupons.length > 0 ? (
            <ul>
              {usedCoupons.map((coupon) => (
                <li key={coupon.id}>
                  <div className="profilePageCoupon">
                    <p className="profilePageText">Code: {coupon.code}</p>
                    <p className="profilePageText">Description: {coupon.Description}</p>
                    <p className="profilePageText">Company Name: {coupon.companyName}</p>
                    <p className="profilePageText">
                      Expiration Date: {coupon.expirationDate?.toDate().toLocaleString()}
                    </p>
                   
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No coupons found</p>
          )}
      
    </div>
  );
};

export default YourUsedCoupons;
