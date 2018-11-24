import React from "react";

import SideButton from "./SideButton/SideButton";

import "./Sidebar.scss";

export default ({ logout }) => (
  <div className="Sidebar">
    {/* icons with nav links */}
    <ul className="Sidebar-Links">
      <SideButton path="/" iconClasses="far fa-clock" />
      {/* the trello icon will be changed */}
      {/* i couldn't find a better icon */}
      <SideButton path="/board" iconClasses="fab fa-trello" />
      {/* placeholders for future features */}
      {/* <SideButton path="/todo" iconClasses="fas fa-tasks" /> */}
      <li className="Sidebar-Link">
        <i onClick={logout} className="fas fa-sign-out-alt" />
      </li>
    </ul>
  </div>
);
