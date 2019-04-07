import React from "react";
import PropTypes from "prop-types";
import "./Navbar.scss";
import { NavLink } from "react-router-dom";

const navbar = ({ toggleForms }) => {
  return (
    <nav className="Landing-Navbar">
      <div className="nav-wrapper Container">
        {/* <a href="#" class="brand-logo">
          Logo
        </a> */}
        <ul id="nav-mobile" className="right">
          <li>
            <NavLink to="/">FAQ</NavLink>
          </li>
          <li>
            <NavLink to="/">Features</NavLink>
          </li>
          <li>
            <button className="AuthButton" onClick={toggleForms}>
              Register / Log in
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

navbar.propTypes = {
  toggleForms: PropTypes.func.isRequired
};

export default navbar;
