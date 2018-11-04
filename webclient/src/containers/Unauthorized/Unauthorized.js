import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/auth";
import Navbar from "../../components/Navigation/UnauthorizedNavbar/UnauthorizedNavbar";
import PomodoroSection from "../../components/UnauthorizedSections/Pomodoro/Pomodoro";
import "./Unauthorized.scss";

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
    return (
      // This is the website for when you're not logged in
      // So far it will have a login and a signup form
      <Fragment>
        <Navbar
          state={this.state}
          onSubmit={this.submitHandler}
          onChange={this.onChangeHandler}
        />
        <main className="Container">
          {/* feature sections */}

          {/* hero placeholder */}

          {/* pomodoro section */}
          <PomodoroSection />

          {/*  */}
        </main>
      </Fragment>
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
