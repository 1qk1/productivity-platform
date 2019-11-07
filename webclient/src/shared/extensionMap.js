import React, { lazy } from "react";
import { Route } from "react-router-dom";

const AsyncPomodoro = lazy(() => import("../containers/Pomodoro/Pomodoro"));
const AsyncBoards = lazy(() => import("../containers/Boards/Boards"));
const AsyncBoard = lazy(() => import("../containers/Boards/Board"));

const extensionMap = {
  pomodoro: {
    title: "Pomodoro",
    component: <AsyncPomodoro />,
    iconClasses: "far fa-clock",
    description: "A 25 minute clock with 5 minute breaks in between."
  },
  boards: {
    title: "Kanban Boards",
    component: <AsyncBoards />,
    iconClasses: "fab fa-trello",
    description: "Trello without going on trello.",
    childRoutes: { "boards/:boardId": { component: <AsyncBoard /> } }
  }
};

export default extensionMap;

export const extensionsToRoutes = extensions =>
  extensions.reduce((allRoutes, extension) => {
    return [
      allRoutes,
      extensionMap[extension].hasOwnProperty("childRoutes")
        ? childExtensions(extension)
        : null,
      <Route
        key={`${extension}-route`}
        path={`/${extension}`}
        component={() => extensionMap[extension].component}
      />
    ];
  }, []);

const childExtensions = extension =>
  Object.keys(extensionMap[extension].childRoutes).map(child => (
    <Route
      key={`${child}-route`}
      path={`/${child}`}
      component={() => extensionMap[extension].childRoutes[child].component}
    />
  ));