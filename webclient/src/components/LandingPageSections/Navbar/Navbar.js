import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "./Navbar.scss";
import { NavLink } from "react-router-dom";
import Modal from "../../UI/Modal/Toggler";
import Login from "../../Auth/Login";
import Register from "../../Auth/Register";

const navbar = props => {
  const { error } = props;
  let errorMessage = null;

  if (error) {
    errorMessage = error.response.data.error.message;
  }
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
            <Modal
              state={props.state}
              onClose={props.onClose}
              onSubmit={props.onSubmit}
              buttonClasses="AuthButton"
              modalClasses="AuthModal"
              title="Join Us"
            >
              <Fragment>
                <Login
                  submitHandler={props.onSubmit}
                  onChangeHandler={props.onChange}
                  {...props.state.login}
                />
                {errorMessage ? (
                  <p style={{ color: "red" }}>{errorMessage}</p>
                ) : null}
                <Register
                  submitHandler={props.onSubmit}
                  onChangeHandler={props.onChange}
                  {...props.state.register}
                />
              </Fragment>
            </Modal>
          </li>
        </ul>
      </div>
    </nav>
  );
};

navbar.propTypes = {
  state: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.object
};

export default navbar;
