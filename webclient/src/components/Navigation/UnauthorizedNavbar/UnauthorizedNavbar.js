import React from "react";
import "./UnauthorizedNavbar.scss";
import { NavLink } from "react-router-dom";
import Modal from "../../UI/Modal/Toggler";
import Login from "../../Auth/Login";
import Register from "../../Auth/Register";

const unauthorizedNavbar = props => {
  let error = null;

  if (props.error) {
    switch (props.error.response.status) {
      case 400:
        error = "User already exists";
        break;
      case 401:
        error = "Wrong Username or Password";
        break;
      default:
        break;
    }
  }

  console.log(props, "navbar props");
  return (
    <nav className="Unauthorized-Navbar">
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
              {/* {console.log(props.error.message)} */}
              {error ? <p style={{ color: "red" }}>{error}</p> : null}
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

export default unauthorizedNavbar;
