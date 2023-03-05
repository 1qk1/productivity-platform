import React from "react";
import { createRoot } from "react-dom/client";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import App from "./App";

import thunk from "redux-thunk";
import ReduxAsyncQueue from "redux-async-queue";
import pomodoroReducer from "./store/reducers/pomodoro";
import userReducer from "./store/reducers/user";
import boardReducer from "./store/reducers/board";

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

import "./index.scss";
// import "./vendors/materialize/sass/materialize.scss";
import "./scss/_index.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "typeface-montserrat";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new BrowserTracing()],
  environment: process.env.NODE_ENV,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  pomodoro: pomodoroReducer,
  user: userReducer,
  board: boardReducer,
});

const sentryReduxEnhancer = Sentry.createReduxEnhancer({
  // Optionally pass options listed below
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, ReduxAsyncQueue), sentryReduxEnhancer),
);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

const root = createRoot(document.getElementById("root"));
root.render(app);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
