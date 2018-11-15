import * as actionTypes from "./actionTypes";
import axios from "../../axios";
import { toast } from "react-toastify";
import SuccessSound from "../../assets/success.mp3";

export const pomodoroCompleted = () => {
  return dispatch => {
    const sound = new Audio(SuccessSound);
    sound.play();
    dispatch({ type: actionTypes.STOP_TIMER });
    axios
      .post("/pomodoro")
      .then(response => {
        toast.success("Added new pomodoro in the database!");
        const newPomodoro = response.data;
        dispatch({ type: actionTypes.POMODORO_COMPLETED, newPomodoro });
      })
      .catch(error => {
        toast.error("We couldn't add your pomodoro to the database :(");
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
