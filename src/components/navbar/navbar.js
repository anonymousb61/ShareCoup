import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const Navbar = () => {
  return (
    <div className="navbar" style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <Link className="navItem" to="/">Home</Link>
      </div>
      <div>
        <Link className="navItem" to="/ProfilePage">Profile Page</Link>
      </div>
      <div>
        <Link className="navItem" to="/dashboard">List</Link>
      </div>
      <div>
        <Link className="navItem" to="/addCode">Add Code</Link>
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>

    </div>
  );
};

export default Navbar;
