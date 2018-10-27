import React from "react";

import SideButton from "./SideButton/SideButton";

import "./Sidebar.scss";

export default () => (
  <div className="Sidebar">
    {/* icons with nav links */}
    <ul className="Sidebar-Links">
      <SideButton path="/" iconClasses="far fa-clock" />
      <SideButton path="settings" iconClasses="fas fa-cog" />
      <SideButton path="/todo" iconClasses="fas fa-tasks" />
    </ul>
  </div>
);
