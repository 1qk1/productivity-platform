import React from "react";
import PropTypes from "prop-types";
import InputWithErrors from "../UI/InputWithErrors/InputWithErrors";

import "./Auth.scss";

const register = props => (
  <div className="SignupForm AuthForm">
    <h5>Signup</h5>
    <form id="register" onSubmit={props.submitHandler}>
      <InputWithErrors
        label="Username"
        data={props.fieldData.username}
        onChange={props.onChangeHandler}
        type="text"
        name="username"
        formId="register"
      />
      <InputWithErrors
        label="Password"
        data={props.fieldData.password}
        onChange={props.onChangeHandler}
        type="password"
        name="password"
        formId="register"
      />
      <InputWithErrors
        label="Email Address"
        data={props.fieldData.email}
        onChange={props.onChangeHandler}
        type="email"
        name="email"
        formId="register"
      />
      <button className="btn btn-green" type="submit" name="action">
        Sign Up
      </button>
    </form>
  </div>
);

register.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  fieldData: PropTypes.object.isRequired
};

export default register;
