import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const submitPomodoro = userId => {
  return dispatch => {
    axios.post("/pomodoro", { userId }).then(response => {
      console.log(response);
    });
  };
};

export const getPomodoros = () => {
  return dispatch => {
    axios.get("/pomodoro/").then(response => {
      const pomodoros = response.data;
      dispatch({ type: actionTypes.GET_POMODOROS, pomodoros });
    });
  };
};
