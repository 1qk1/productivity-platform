import React from "react";
import PropTypes from "prop-types";
import InputWithErrors from "../UI/InputWithErrors/InputWithErrors";

import "./Auth.scss";

const login = props => (
  <div className="LoginForm AuthForm">
    <h5>Login</h5>
    <form id="login" onSubmit={props.submitHandler}>
      <InputWithErrors
        label="Username"
        data={props.fieldData.username}
        onChange={props.onChangeHandler}
        type="text"
        name="username"
        formId="login"
      />
      <InputWithErrors
        label="Password"
        data={props.fieldData.password}
        onChange={props.onChangeHandler}
        type="password"
        name="password"
        formId="login"
      />
      <div>
        <button className="btn btn-green" type="submit" name="action">
          Log in
        </button>
        <a className="d-inline-block ml-4" href="/forgot-password">Forgot Pasword?</a>
      </div>
    </form>
  </div>
);

login.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  fieldData: PropTypes.object.isRequired
};

export default login;
