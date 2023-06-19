import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const Navbar = ({ isUserSignedIn }) => {
  return (
    <div className="navbar" style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <Link className="navItem" to="/">Home</Link>
      </div>

      {isUserSignedIn && (
        <div>
          <Link className="navItem" to="/ProfilePage">Profile Page</Link>
        </div>
      )}
      {isUserSignedIn && (
      <div>
        <Link className="navItem" to="/dashboard">Coupons</Link>
      </div>)}
      {isUserSignedIn && (
      <div>
        <Link className="navItem" to="/addCode">Add Code</Link>
      </div>)}
      {!isUserSignedIn && (
        <div>
          <Link className="navItem" to="/auth/login">Login</Link>
        </div>
      )}
      {!isUserSignedIn && (
        <div>
          <Link className="navItem" to="/auth/signUp">Sign Up</Link>
        </div>
      )}
      {isUserSignedIn && (
        <div>
          <Link className="navItem" to="/auth/signOut">Sign Out</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
