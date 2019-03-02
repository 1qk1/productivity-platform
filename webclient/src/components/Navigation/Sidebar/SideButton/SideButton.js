import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import "./SideButton.scss";

const sideButton = ({ iconClasses, path, title }) => (
  <li className="Sidebar-Link">
    <NavLink to={path}>
      <i className={iconClasses} title={title} />
    </NavLink>
  </li>
);

sideButton.propTypes = {
  iconClasses: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
};

export default sideButton;
