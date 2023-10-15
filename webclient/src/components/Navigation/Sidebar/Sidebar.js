import React, { Fragment } from "react";
import PropTypes from "prop-types";
import extensionMap from "../../../shared/extensionMap";

import SideButton from "./SideButton/SideButton";

import "./Sidebar.scss";
import withRouter from '../../../shared/withRouter'

const sidebar = ({ logout, extensions, location }) => {
  return (
    <div className="Sidebar">
      {/* icons with nav links */}
      <ul className="Sidebar-Links h-100 d-flex flex-column justify-content-between">
        <div>
          {extensions.map((extension, i) => {
            const ret = (
              <SideButton
                key={`${extension}-sideButton`}
                path={`/${extension}`}
                iconClasses={extensionMap[extension].iconClasses}
              />
            );
            if (location.pathname.startsWith(`/${extension}`)) {
              return (
                <Fragment key={`${i}-frag`}>
                  {ret}
                  {Object.keys(extensionMap[extension].childRoutes).map((key) => {
                    if (extensionMap[extension].childRoutes[key].sidebar) {
                      return (
                        <SideButton
                          key={`${key}-sideButton`}
                          path={`/${key}`}
                          iconClasses={
                            extensionMap[extension].childRoutes[key].iconClasses
                          }
                        />
                      );
                    }
                    return null;
                  })}
                </Fragment>
              );
            }
            return ret;
          })}
        </div>
        <div>
          <SideButton path="/store" iconClasses="fas fa-store" />
          <SideButton path="/settings" iconClasses="fas fa-gear" />
          <li className="Sidebar-Link">
            <i onClick={logout} className="fas fa-sign-out-alt" />
          </li>
        </div>
      </ul>
    </div>
  );
}
sidebar.propTypes = {
  logout: PropTypes.func.isRequired,
  extensions: PropTypes.array.isRequired,
};

export default withRouter(sidebar);
