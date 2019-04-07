import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import App from "./App";

import thunk from "redux-thunk";
import ReduxAsyncQueue from "redux-async-queue";
import pomodoroReducer from "./store/reducers/pomodoro";
import authReducer from "./store/reducers/auth";
import boardReducer from "./store/reducers/board";

import "./index.scss";
import "normalize.css";
import "./vendors/materialize/sass/materialize.scss";
import "./scss/_index.scss";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  pomodoro: pomodoroReducer,
  auth: authReducer,
  board: boardReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, ReduxAsyncQueue))
);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
