import React, { Component, lazy, Suspense } from "react";
import "./App.scss";
import Loader from "./components/UI/Loader/Loader";
import { connect } from "react-redux";
import * as actions from "./store/actions/auth";
import { Switch, Redirect, Route, BrowserRouter } from "react-router-dom";

const AsyncLandingPage = lazy(() =>
  import("./containers/LandingPage/LandingPage")
);

const AsyncMain = lazy(() => import("./containers/Main/Main"));

class App extends Component {
  componentDidMount() {
    this.props.checkToken();
  }

  render() {
    let content = <Loader />;

    const token = this.props.token;

    if (token === null) {
      // check if not logged in then
      // show the website
      content = (
        <Switch>
          <Suspense fallback={<Loader />}>
            <Route path="/" exact component={() => <AsyncLandingPage />} />
            <Redirect to="/" />
          </Suspense>
        </Switch>
      );
    } else if (token !== undefined) {
      // show main app when token is cheched (not undefined)
      // undefined = not checked (first pass), anything else than
      // undefined = token, this can't be null because it has been already checked
      content = (
        <Suspense fallback={<Loader />}>
          <AsyncMain />
        </Suspense>
      );
    }

    return <BrowserRouter>{content}</BrowserRouter>;
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
