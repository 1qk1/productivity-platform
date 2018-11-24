import React from "react";
import "./HomeNavbar.scss";
import { NavLink } from "react-router-dom";
import Modal from "../../UI/Modal/Toggler";
import Login from "../../Auth/Login";
import Register from "../../Auth/Register";

const homeNavbar = props => {
  return (
    <nav className="Home-Navbar">
      <div className="nav-wrapper Container">
        {/* <a href="#" class="brand-logo">
          Logo
        </a> */}
        <ul id="nav-mobile" className="right">
          <li>
            <NavLink to="/">FAQ</NavLink>
          </li>
          <li>
            <NavLink to="/">Pricing</NavLink>
          </li>
          <li>
            <Modal
              state={props.state}
              onClose={props.onClose}
              onSubmit={props.onSubmit}
              buttonClasses="AuthButton"
              modalClasses="AuthModal"
              title="Join Us"
            >
              <Login
                submitHandler={props.onSubmit}
                onChangeHandler={props.onChange}
              />
              <Register
                submitHandler={props.onSubmit}
                onChangeHandler={props.onChange}
              />
            </Modal>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default homeNavbar;
