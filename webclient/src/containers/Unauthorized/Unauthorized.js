import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/auth";
// import Navbar from "../../components/Navigation/UnauthorizedNavbar/UnauthorizedNavbar";
// import PomodoroSection from "../../components/UnauthorizedSections/Pomodoro/Pomodoro";
// import BoardSection from "../../components/UnauthorizedSections/Board/Board";
import Login from "../../components/Auth/Login";
import Register from "../../components/Auth/Register";
import "./Unauthorized.scss";
import Hero from "../../components/UnauthorizedSections/Hero/Hero";

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
    const type = event.target.id;

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
    let error = null;

    if (this.props.error) {
      switch (this.props.error.response.status) {
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
    return (
      // This is the website for when you're not logged in
      // So far it will have a login and a signup form

      // Commented out the preview components because
      // they're looking bad.

      <Fragment>
        {/* <Navbar
          error={this.props.error}
          state={this.state}
          onSubmit={this.submitHandler}
          onChange={this.onChangeHandler} */}
        {/* /> */}

        {/* feature preview sections */}

        {/* hero section */}
        {/* <Hero /> */}

        {/* pomodoro section */}
        {/* <PomodoroSection /> */}

        {/* Board section */}
        {/* <BoardSection /> */}

        {/* todo section */}
        {/*  */}

        <div className="Container">
          {/* Auth forms */}
          <Login
            submitHandler={this.submitHandler}
            onChangeHandler={this.onChangeHandler}
          />
          {error ? <p style={{ color: "red" }}>{error}</p> : null}
          <Register
            submitHandler={this.submitHandler}
            onChangeHandler={this.onChangeHandler}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  onAuth: ({ authType, data }) => dispatch(actions.authHandler(authType, data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Unauthorized);
