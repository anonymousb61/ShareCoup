import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";


function HowToUse() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <h2>How to Use ShareCoup?</h2>
<ul className='howToUseList'>
{!isLoggedIn && <li>To start using, <Link  to="/auth/signUp">Sign Up</Link> OR <Link  to="/auth/login">Login</Link> </li>}
  <li>To <b>look for available coupons</b>, click on 'Coupons'. </li>
  <li>To <b>use a coupon</b>, click on 'Copy code' to copy the coupon code to your clipboard and then paste it in the desired application</li>
  <li>Remember to click on 'Using this coupon' if you use the coupon. </li>
  <li> If you find that a coupon that isnt working, let the others know by unchecking the 'is Available' box</li>
  <li>To <b>add a coupon</b>, click on 'Add Code'. Enter all details and click on submit. </li>
</ul>
<h1>Happy Sharing!</h1>
    </div>
  )
}

export default HowToUse
