import React, { Component } from "react";
import "./App.scss";
import Main from "./containers/Main/Main";
import Loader from "./components/UI/Loader/Loader";
import Unauthorized from "./containers/Unauthorized/Unauthorized";
import { connect } from "react-redux";
import * as actions from "./store/actions/auth";
import { Switch, Redirect, Route, BrowserRouter } from "react-router-dom";

class App extends Component {
  componentDidMount() {
    this.props.checkToken();
  }

  render() {
    let content = <Loader />;
    const token = this.props.token;

    if (token !== null) {
      // show main app when you are logged in
      content = <Main />;
    } else {
      // check if not logged in then
      // show the website
      content = (
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Unauthorized} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      );
    }

    return content;
  }
}

const mapStateToProps = state => ({
  token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  checkToken: () => dispatch(actions.checkAuth())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
