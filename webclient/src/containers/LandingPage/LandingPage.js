import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/auth";
// import Navbar from "../../components/Navigation/LandingPageNavbar/LandingPageNavbar";
// import PomodoroSection from "../../components/LandingPageSections/Pomodoro/Pomodoro";
// import BoardSection from "../../components/LandingPageSections/Board/Board";
// import Hero from "../../components/LandingPageSections/Hero/Hero";
import Login from "../../components/Auth/Login";
import Register from "../../components/Auth/Register";
import "./LandingPage.scss";

class LandingPage extends Component {
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
    // start authentication with the login data
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
    // change the state
    this.setState(() => ({ [actionType]: newState }));
  };

  render() {
    // check for error
    const { error } = this.props;
    let errorMessage = null;

    if (error) {
      errorMessage = error.response.data.error.message;
    }
    return (
      // This is the website for when you're not logged in
      // So far it will have a login and a signup form

      // Commented out the preview components because
      // they're looking bad at the moment.

      <Fragment>
        {/* this is the navbar with the auth forms modal */}
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
          {/* show error if there is an error with the authentication process */}
          {errorMessage ? <p style={{ color: "red" }}>{errorMessage}</p> : null}
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
  // executes when authentication starts
  onAuth: ({ authType, data }) => dispatch(actions.authHandler(authType, data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
