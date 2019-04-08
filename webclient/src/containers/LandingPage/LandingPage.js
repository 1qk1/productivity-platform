import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios";
import * as actions from "../../store/actions/index";
import Navbar from "../../components/LandingPageSections/Navbar/Navbar";
import PomodoroSection from "../../components/LandingPageSections/Pomodoro/Pomodoro";
import BoardSection from "../../components/LandingPageSections/Board/Board";
import StatsSection from "../../components/LandingPageSections/Stats/Stats";
import Footer from "../../components/LandingPageSections/Footer/Footer";
import Hero from "../../components/LandingPageSections/Hero/Hero";
import AuthForms from "../../components/Auth/Auth";
import _ from "lodash";
import initialState from "./initialState";
import { validate } from "../../shared/utilities";

import "./LandingPage.scss";

class LandingPage extends Component {
  // moved the state in a separate file because it was huge
  state = initialState;

  submitHandler = event => {
    // prevent the default submit action
    event.preventDefault();
    // get the type of the submitted form (register/login)
    const type = event.target.id;
    if (!_.every(this.state.formData[type], ["valid", true])) return;
    // start authentication with the login data
    // convert the form fields in a {username: "something"} form
    const data = Object.keys(this.state.formData[type]).reduce(
      (sum, key) => ({ ...sum, [key]: this.state.formData[type][key].value }),
      {}
    );
    this.makeAuthRequest(type, data);
  };

  makeAuthRequest = (type, data) => {
    // send the data
    axios
      .post(`/auth/${type}`, data)
      .then(res => {
        const { token, user } = res.data;
        // set the auth header as the user's JWT
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        // set the token in local storage
        localStorage.setItem("token", token);
        // send the user to redux
        this.props.onAuthSuccess(token, user);
      })
      .catch(error => {
        // get the error array from the objects
        const errors = error.response.data.error.message;
        const newFormData = _.cloneDeep(this.state.formData);
        // if the errors is a string
        if (_.isString(errors)) {
          // set the form's error to this error
          newFormData.error = errors;
          this.setState({ formData: newFormData });
          // else (array)
        } else {
          // set each field's error based on each error in the array
          _.forEach(newFormData[type], field => (field.errors = []));
          errors.forEach(err =>
            newFormData[type][err.param].errors.push(err.msg)
          );
          // update state with the errors
          this.setState({ formData: newFormData });
        }
      });
  };

  onChangeHandler = e => {
    // get the value from the element
    const value = e.target.value;
    // get what action you want to do (login/register) from the closest form id
    const actionType = e.target.closest("form").id;
    //get the field name
    const fieldName = e.target.name;
    // clone the form data
    const newFormData = _.cloneDeep(this.state.formData);
    // change the value
    newFormData[actionType][fieldName].value = value;
    newFormData[actionType][fieldName].touched = true;

    // validate the field
    const validationErrors = validate(
      value,
      this.state.formData[actionType][fieldName].rules
    );
    // update the new form data
    newFormData[actionType][fieldName] = {
      ...newFormData[actionType][fieldName],
      errors: validationErrors,
      valid: validationErrors.length === 0
    };
    // change the state
    this.setState({ formData: newFormData });
  };

  toggleModal = () =>
    this.setState(() => ({ showForms: !this.state.showForms }));

  render() {
    return (
      <div className="Landing-Page">
        <AuthForms
          submitHandler={this.submitHandler}
          onChangeHandler={this.onChangeHandler}
          formData={this.state.formData}
          showForms={this.state.showForms}
          toggleModal={this.toggleModal}
        />
        <header>
          <Navbar toggleForms={this.toggleModal} />
          <Hero toggleForms={this.toggleModal} />
        </header>
        <PomodoroSection />
        <BoardSection />
        <StatsSection />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.user.error
});

const mapDispatchToProps = dispatch => ({
  onAuthSuccess: (token, user) => dispatch(actions.authSuccess(token, user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
