import React, { lazy } from "react";
import { Route } from "react-router-dom";

const AsyncPomodoro = lazy(() => import("../containers/Pomodoro/Pomodoro"));
const AsyncPomodoroTimesheets = lazy(() =>
  import("../containers/Pomodoro/Timesheets")
);
const AsyncBoards = lazy(() => import("../containers/Boards/Boards"));
const AsyncBoard = lazy(() => import("../containers/Boards/Board"));

const extensionMap = {
  pomodoro: {
    title: "Pomodoro",
    component: <AsyncPomodoro />,
    iconClasses: "far fa-clock",
    description: "A 25 minute clock with 5 minute breaks in between.",
    childRoutes: {
      "pomodoro/timesheets": {
        component: <AsyncPomodoroTimesheets />,
        text: "Timesheets",
        sidebar: true,
        iconClasses: "fas fa-chart-line mb-5",
      },
    },
  },
  boards: {
    title: "Kanban Boards",
    component: <AsyncBoards />,
    iconClasses: "fab fa-trello",
    description: "Trello without going on trello.",
    childRoutes: { "boards/:boardId/:cardId": { component: <AsyncBoard /> }, "boards/:boardId": { component: <AsyncBoard /> } },
  },
};

export default extensionMap;

export const extensionsToRoutes = (extensions) =>
  extensions.reduce((allRoutes, extension) => {
    return [
      allRoutes,
      extensionMap[extension].hasOwnProperty("childRoutes")
        ? childExtensions(extension)
        : null,
      <Route
        key={`${extension}-route`}
        path={`/${extension}`}
        element={extensionMap[extension].component}
      />,
    ];
  }, []);

const childExtensions = (extension) =>
  Object.keys(extensionMap[extension].childRoutes).map((child) => (
    <Route
      key={`${child}-route`}
      path={`/${child}`}
      element={extensionMap[extension].childRoutes[child].component}
    />
  ));
