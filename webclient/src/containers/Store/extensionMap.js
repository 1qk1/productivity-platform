import React, { lazy } from "react";

const AsyncPomodoro = lazy(() => import("../Pomodoro/Pomodoro"));
const AsyncBoard = lazy(() => import("../Board/Board"));

export default {
  pomodoro: {
    title: "Pomodoro",
    component: <AsyncPomodoro />,
    iconClasses: "far fa-clock",
    description: "A 25 minute clock with 5 minute breaks in between."
  },
  board: {
    title: "Kanban Board",
    component: <AsyncBoard />,
    iconClasses: "fab fa-trello",
    description: "Trello without going on trello."
  }
};
