import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const pomodoroCompleted = () => {
  return dispatch => {
    dispatch({ type: actionTypes.STOP_TIMER });
    axios.post("/pomodoro").then(response => {
      const newPomodoro = response.data;
      dispatch({ type: actionTypes.POMODORO_COMPLETED, newPomodoro });
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
