import React from "react";

import "./Auth.scss";

const login = props => {
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

export default login;
