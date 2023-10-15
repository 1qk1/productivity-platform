import React, { Component, Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { extensionsToRoutes } from "../../shared/extensionMap";
import Store from "../Store/Store";
import Settings from "../Settings/Settings";
import Sidebar from "../../components/Navigation/Sidebar/Sidebar";
import "./Main.scss";
import withRouter from '../../shared/withRouter';

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
            <Routes>
              {extensionsToRoutes(this.props.extensions)}

              <Route path="/store" exact element={<Store />} />
              <Route path="/settings" exact element={<Settings />} />
              <Route path="/*" element={<Navigate to={this.props.extensions[0] || "/store"} />} />
            </Routes>
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
