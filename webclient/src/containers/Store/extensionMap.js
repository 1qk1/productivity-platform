import React, { lazy } from "react";

const AsyncPomodoro = lazy(() => import("../Pomodoro/Pomodoro"));
const AsyncBoard = lazy(() => import("../Board/Board"));

export default {
  pomodoro: { component: <AsyncPomodoro />, iconClasses: "far fa-clock" },
  board: { component: <AsyncBoard />, iconClasses: "fab fa-trello" }
};
