import * as actionTypes from "./actionTypes";
import axios from "../../axios";
import { toast } from "react-toastify";
import PomodoroSound from "../../assets/notifications/pomodoro.mp3";
import BreakSound from "../../assets/notifications/break.mp3";

export const startPomodoro = () => {
  return (dispatch) => {
    const decTimer = () => dispatch({ type: actionTypes.DEC_TIMER });
    const intervalId = setInterval(decTimer, 1000);
    dispatch({ type: actionTypes.START_TIMER, intervalId });
  };
};

export const updateTimer = () => {
  return (dispatch, getState) => {
    if (getState().pomodoro.intervalId !== null) {
      dispatch({ type: actionTypes.UPDATE_TIMER });
    }
  };
};

export const stopTimer = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.STOP_TIMER });
  };
};

export const end5Seconds = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.END_POMODORO_5_SECONDS });
  };
};

export const submitPomodoro = () => {
  return (dispatch) => {
    axios
      .post("/pomodoro")
      .then((response) => {
        toast.success("Added new pomodoro in the database!");
        const newPomodoro = response.data;
        dispatch({ type: actionTypes.POMODORO_COMPLETED, newPomodoro });
      })
      .catch((error) => {
        toast.error(error.response.data.error.message);
      });
  };
};

export const pomodoroCompleted = (isPomodoro) => {
  return (dispatch) => {
    const soundFile = isPomodoro ? PomodoroSound : BreakSound;
    const sound = new Audio(soundFile);
    sound.play();
    if (isPomodoro) {
      dispatch(submitPomodoro());
      dispatch({ type: actionTypes.START_BREAK });
    } else {
      dispatch({ type: actionTypes.STOP_TIMER });
    }
  };
};

export const getPomodoros = () => {
  return (dispatch) => {
    axios.get("/pomodoro/").then((response) => {
      const pomodoros = response.data;
      dispatch({ type: actionTypes.GET_POMODOROS, pomodoros });
    });
  };
};
