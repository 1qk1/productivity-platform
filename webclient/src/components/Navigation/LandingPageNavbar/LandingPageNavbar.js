import React from "react";
import PropTypes from "prop-types";
import "./LandingPageNavbar.scss";
import { NavLink } from "react-router-dom";
import Modal from "../../UI/Modal/Toggler";
import Login from "../../Auth/Login";
import Register from "../../Auth/Register";

const landingPageNavbar = props => {
  const { error } = props;
  let errorMessage = null;

  if (error) {
    errorMessage = error.response.data.error.message;
  }
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
              {errorMessage ? (
                <p style={{ color: "red" }}>{errorMessage}</p>
              ) : null}
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

landingPageNavbar.PropTypes = {
  state: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.object
};

export default landingPageNavbar;
