import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, getAuth } from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';

const ProfilePage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userCoupons, setUserCoupons] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
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

  const deleteCode = async (id) => {
    const codeDoc = doc(db, 'codes', id);

    try {
      await deleteDoc(codeDoc);
      console.log('Code deleted successfully');

      // Remove the deleted coupon from the userCoupons state
      setUserCoupons((prevCoupons) =>
        prevCoupons.filter((coupon) => coupon.id !== id)
      );
    } catch (error) {
      console.error('Error deleting code:', error);
    }
  };

  useEffect(() => {
    const fetchUserCoupons = async (userId) => {
      try {
        const q = query(collection(db, 'codes'), where('addedByUserId', '==', userId));
        const querySnapshot = await getDocs(q);
        const userCouponData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setUserCoupons(userCouponData);
      } catch (error) {
        console.error(error);
      }
    };

    const authInstance = getAuth();
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      if (user) {
        const userId = user.uid; // Retrieve the user ID from the user object
        fetchUserCoupons(userId);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
                  <div className="profilePageCoupon">
                    <p className="profilePageText">Code: {coupon.code}</p>
                    <p className="profilePageText">Description: {coupon.Description}</p>
                    <p className="profilePageText">Company Name: {coupon.companyName}</p>
                    <p className="profilePageText">
                      Expiration Date: {coupon.expirationDate?.toDate().toLocaleString()}
                    </p>
                    <button
                      className="deleteButton"
                      onClick={() => deleteCode(coupon.id)}
                    >
                      Delete
                    </button>
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
