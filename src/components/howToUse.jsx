import React from 'react'
import { Link } from 'react-router-dom'

function HowToUse() {
  return (
    <div>
      <h2>How to Use ShareCoup?</h2>
<ul className='howToUseList'>
    <li>To start using, <Link  to="/auth/signUp">Sign Up</Link> OR <Link  to="/auth/login">Login</Link> </li>
  <li>To <b>look for available coupons</b>, click on 'List'. </li>
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
