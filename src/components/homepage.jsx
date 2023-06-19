import SignIn from "./auth/login";
import SignUp from "./auth/signUp";
import SignOut from "./auth/signOut";
import AuthDetails from "./authDetails";
import { Link } from "react-router-dom";
import HowToUse from "./howToUse";

function HomePage() {
  return (

    <div className="App">
      <div >
    <h1> Welcome to ShareCoup,</h1> <div className="intro"> <p>the ultimate platform for sharing and swapping coupon codes you don't need!</p> 

<p>Are you tired of seeing your valuable discounts go to waste? Look no further. At ShareCoup, we believe in the power of sharing to maximize savings. Whether you have stumbled upon incredible deals that don't align with your needs or found yourself with unused coupon codes, our community is here to help you put them to good use.

</p><p>Join a vibrant network of savvy shoppers just like you, eager to exchange their surplus savings for something they can benefit from. By embracing the spirit of sharing, ShareCoup transforms couponing into a dynamic and sustainable community-driven experience.

</p><p>Share your surplus codes and unlock a world of endless possibilities. Discover hidden gems and unclaimed discounts, ranging from exclusive deals to limited-time promotions, all across a wide range of products and services. With ShareCoup, you'll never miss out on savings again. Together, let's revolutionize the way we maximize the value of every coupon.
</p><p>
At ShareCoup, generosity and resourcefulness merge seamlessly, ensuring that no discount goes unappreciated. Join us today and unlock the potential of your unused coupon codes. It's time to share, swap, and save together.
</p>
<p><Link className= 'howToUse' to='/howToUse'> How to Use?</Link></p>
<p>Start using by <Link to ='/auth/login'> logging In</Link></p>
  </div></div>
      <AuthDetails/>
    </div>
  );
}

export default HomePage;