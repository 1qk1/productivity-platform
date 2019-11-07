import React, { Component, Fragment } from "react";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { extensionsToRoutes } from "../../shared/extensionMap";
import Store from "../Store/Store";
import Sidebar from "../../components/Navigation/Sidebar/Sidebar";
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
              {/* map user's extensions to routes */}
              {extensionsToRoutes(this.props.extensions)}
              <Route path="/store" component={Store} />
              <Redirect to={`${this.props.extensions[0] || "/store"}`} />
            </Switch>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  extensions: state.user.user.extensions
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
