import React from "react";
import PropTypes from "prop-types";
import extensionMap from "../../../shared/extensionMap";

import SideButton from "./SideButton/SideButton";

import "./Sidebar.scss";

const sidebar = ({ logout, extensions }) => (
  <div className="Sidebar">
    {/* icons with nav links */}
    <ul className="Sidebar-Links">
      {extensions.map(extension => (
        <SideButton
          key={`${extension}-sideButton`}
          path={`/${extension}`}
          iconClasses={extensionMap[extension].iconClasses}
        />
      ))}
      <SideButton path="/store" iconClasses="fas fa-store" />
      {/* placeholders for future features */}
      {/* <SideButton path="/todo" iconClasses="fas fa-tasks" /> */}
      <li className="Sidebar-Link">
        <i onClick={logout} className="fas fa-sign-out-alt" />
      </li>
    </ul>
  </div>
);
sidebar.propTypes = {
  logout: PropTypes.func.isRequired,
  extensions: PropTypes.array.isRequired
};

export default sidebar;
