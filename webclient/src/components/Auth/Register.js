import React from "react";
import PropTypes from "prop-types";

import "./Auth.scss";

const register = props => {
  return (
    <div className="SignupForm AuthForm">
      <h5>Signup</h5>
      <form id="register" onSubmit={props.submitHandler}>
        <label>
          Username
          <input onChange={props.onChangeHandler} type="text" name="username" />
        </label>
        <label>
          Password
          <input
            onChange={props.onChangeHandler}
            type="password"
            name="password"
          />
        </label>
        <label>
          Email
          <input onChange={props.onChangeHandler} type="email" name="email" />
        </label>
        <button className="btn" type="submit" name="action">
          Submit
        </button>
      </form>
    </div>
  );
};

register.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  onChangeHandler: PropTypes.func.isRequired
};

export default register;
