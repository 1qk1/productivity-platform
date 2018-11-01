import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/auth";

class Unauthorized extends Component {
  state = {
    login: {
      username: "",
      password: ""
    },
    register: {
      username: "",
      password: "",
      email: ""
    }
  };
  submitHandler = event => {
    // prevent the default submit action
    event.preventDefault();
    console.log(event);
    // get the type of the submitted form (register/login)
    const type = event.target.closest("form").id;

    this.props.onAuth({ authType: type, data: this.state[type] });
  };

  onChangeHandler = e => {
    // get the value from the element
    const value = e.target.value;
    // get what action you want to do (login/register)
    const actionType = e.target.closest("form").id;
    //get what the element action is (username/password etc)
    const elType = e.target.name;
    // clone the login/register field
    const newState = { ...this.state[actionType] };
    // change the value
    newState[elType] = value;
    console.log(newState);
    // change the state
    this.setState(() => ({ [actionType]: newState }));
  };

  render() {
    return (
      // This is the website for when you're not logged in
      // So far it will have a login and a signup form
      <div>
        <h4>Login</h4>
        <form id="login" onSubmit={this.submitHandler}>
          <input
            onChange={this.onChangeHandler}
            type="text"
            name="username"
            placeholder="username"
          />
          <input
            onChange={this.onChangeHandler}
            type="password"
            name="password"
            placeholder="password"
          />
          <input type="submit" />
        </form>
        <h4>Signup</h4>
        <form id="register" onSubmit={this.submitHandler}>
          <input
            onChange={this.onChangeHandler}
            type="text"
            name="username"
            placeholder="username"
          />
          <input
            onChange={this.onChangeHandler}
            type="password"
            name="password"
            placeholder="password"
          />
          <input
            onChange={this.onChangeHandler}
            type="email"
            name="email"
            placeholder="email"
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onAuth: ({ authType, data }) => dispatch(actions.authHandler(authType, data))
});

export default connect(
  null,
  mapDispatchToProps
)(Unauthorized);
