import React from "react";
import { NavLink } from "react-router-dom";

import "./SideButton.scss";

export default ({ iconClasses, path }) => (
  <li className="Sidebar-Link">
    <NavLink to={path}>
      <i className={iconClasses} />
    </NavLink>
  </li>
);
