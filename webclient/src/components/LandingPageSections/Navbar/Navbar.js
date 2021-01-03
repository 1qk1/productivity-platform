import React from "react";
import PropTypes from "prop-types";
import "./Navbar.scss";
import { NavLink } from "react-router-dom";

const navbar = ({ toggleForms }) => {
  return (
    <nav className="Landing-Navbar">
      <div className="Container py-3">
        {/* <a href="#" class="brand-logo">
          Logo
        </a> */}
        <ul id="nav-mobile" className="d-flex justify-content-end">
          <li>
            <NavLink to="/" className="px-3 py-2 d-inline-block text-white">FAQ</NavLink>
          </li>
          <li>
            <NavLink to="/" className="px-3 py-2 d-inline-block text-white">Features</NavLink>
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
