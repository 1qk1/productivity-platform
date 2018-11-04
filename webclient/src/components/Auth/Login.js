import React from "react";

import "./Auth.scss";

const login = props => {
  return (
    <div className="LoginForm AuthForm">
      <h5>Login</h5>
      <form id="login" onSubmit={props.submitHandler}>
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
        <button className="btn" type="submit" name="action">
          Submit
        </button>
      </form>
    </div>
  );
};

export default login;
