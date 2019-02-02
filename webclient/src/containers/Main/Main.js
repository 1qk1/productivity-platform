import React, { Component } from "react";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import Sidebar from "../../components/Navigation/Sidebar/Sidebar";
import Store from "../Store/Store";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import extensionMap from "../Store/extensionMap";

class Main extends Component {
  render() {
    return (
      <div className="App row">
        {/* Sidebar */}
        <div className="col s2 m1">
          <Sidebar
            logout={this.props.logout}
            extensions={this.props.extensions}
          />
        </div>
        {/* Routes */}
        <div className="col s10 m11">
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
          <ToastContainer autoClose={5000} pauseOnFocusLoss={false} />
        </div>
      </div>
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
