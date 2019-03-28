import React, { Component, Fragment } from "react";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import Sidebar from "../../components/Navigation/Sidebar/Sidebar";
import Store from "../Store/Store";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import extensionMap from "../Store/extensionMap";
import "./Main.scss";

class Main extends Component {
  render() {
    return (
      <Fragment>
        <div className="App">
          {/* Sidebar */}
          <Sidebar
            logout={this.props.logout}
            extensions={this.props.extensions}
          />
          {/* Routes */}
          <div className="Extension">
            <Switch>
              {this.props.extensions.map(extension => (
                <Route
                  key={`${extension}-route`}
                  path={`/${extension}`}
                  component={() => extensionMap[extension].component}
                />
              ))}
              <Route path="/store" component={Store} />
              <Redirect to={`${this.props.extensions[0] || "/store"}`} />
            </Switch>
          </div>
        </div>
        <ToastContainer autoClose={5000} pauseOnFocusLoss={false} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  extensions: state.auth.user.extensions
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logoutHandler())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Main)
);
