import React from "react";
import logo from "./logo.svg";
import { Link } from "react-router-dom";

function Navbar() {
  {
    return (
        <nav className="navbar navbar-expand-em bg-light">
        <div className="container">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <img alt="" src={logo} />
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/LoginPage">
                <button type="button" className="btn btn-primary">Login/Signup</button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
