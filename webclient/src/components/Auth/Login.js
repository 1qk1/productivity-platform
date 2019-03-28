import React from "react";
import PropTypes from "prop-types";

import "./Auth.scss";

const login = props => {
  return (
    <div className="LoginForm AuthForm">
      <h5>Login</h5>
      <form id="login" onSubmit={props.submitHandler}>
        <label>
          Username
          <input
            value={props.username}
            onChange={props.onChangeHandler}
            type="text"
            name="username"
          />
        </label>
        <label>
          Password
          <input
            value={props.password}
            onChange={props.onChangeHandler}
            type="password"
            name="password"
          />
        </label>
        <button className="btn btn-green" type="submit" name="action">
          Log in
        </button>
      </form>
    </div>
  );
};

login.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};

export default login;
