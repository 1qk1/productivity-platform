import React, { Component, lazy, Suspense, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "./store/actions/user";
import { Switch, Redirect, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loader from "./components/UI/Loader/Loader";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.scss";

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
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path="/" exact component={() => <AsyncLandingPage />} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
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

    return (
      <Fragment>
        <BrowserRouter>{content}</BrowserRouter>
        <ToastContainer autoClose={5000} pauseOnFocusLoss={false} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  token: state.user.token
});

const mapDispatchToProps = dispatch => ({
  checkToken: () => dispatch(actions.checkAuth())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
