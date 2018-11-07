import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "normalize.css";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import pomodoroReducer from "./store/reducers/pomodoro";
import authReducer from "./store/reducers/auth";
import boardReducer from "./store/reducers/board";
import "./vendors/materialize/sass/materialize.scss";
import "./scss/_index.scss";

const rootReducer = combineReducers({
  pomodoro: pomodoroReducer,
  auth: authReducer,
  board: boardReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

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
