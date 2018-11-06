import React from "react";

import SideButton from "./SideButton/SideButton";

import "./Sidebar.scss";

export default ({ logout }) => (
  <div className="Sidebar">
    {/* icons with nav links */}
    <ul className="Sidebar-Links">
      <SideButton path="/" iconClasses="far fa-clock" />
      <SideButton path="/board" iconClasses="fab fa-trello" />
      {/* <SideButton path="settings" iconClasses="fas fa-cog" /> */}
      <SideButton path="/todo" iconClasses="fas fa-tasks" />
      <li className="Sidebar-Link">
        {/* <button onClick={logout}> */}
        <i onClick={logout} className="fas fa-sign-out-alt" />
        {/* </button> */}
      </li>
    </ul>
  </div>
);
