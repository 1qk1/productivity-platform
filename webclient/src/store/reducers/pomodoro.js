import * as actionTypes from "../actions/actionTypes";

const initialState = {
  timer: 1500,
  intervalId: null,
  pomodoros: [],
  timerEnd: null,
  // isPomodoro true = pomodoro runnning
  // false = break running
  isPomodoro: true,
  completedSessions: 0,
  windowFocused: true,
  settings: {
    time: 25,
    break: 5,
    longBreak: 15,
    longBreakInterval: 4
  }
};

const pomodoroReducer = (state = initialState, action) => {
  console.log(action, state)
  switch (action.type) {
    case actionTypes.SET_TIMER: {
      console.log(action.settings, 'lol')
      return {
        ...state,
        timer: action.settings.time * 60,
        settings: action.settings
      };
    }
    case actionTypes.START_TIMER:
      let date = new Date();
      date.setMinutes(date.getMinutes() + state.timer / 60);
      return {
        ...state,
        intervalId: action.intervalId ? action.intervalId : state.intervalId,
        isPomodoro: true,
        timerEnd: date
      };
    case actionTypes.START_BREAK:
      // if it's the 4th pomodoro, start a 10 minute break
      const breakTime = (state.completedSessions + 1) % state.settings.longBreakInterval !== 0 ? state.settings.break : state.settings.longBreak;
      let breakEnd = new Date();
      breakEnd.setMinutes(breakEnd.getMinutes() + breakTime);
      return {
        ...state,
        isPomodoro: false,
        timerEnd: breakEnd,
        timer: breakTime * 60
      };
    case actionTypes.UPDATE_TIMER: {
      // get the difference between the end time and now
      // update timer property
      if (state.intervalId) {
        const difference = Math.floor(
          (state.timerEnd - new Date().getTime()) / 1000
        );
        return {
          ...state,
          timer: difference
        };
      }
      return state;
    }
    case actionTypes.DEC_TIMER:
      return {
        ...state,
        timer: state.timer - 1
      };

    case actionTypes.STOP_TIMER:
      clearInterval(state.intervalId);
      return {
        ...state,
        intervalId: null,
        completedSessions: 0,
        isPomodoro: true,
        timer: state.settings.time * 60,
        timerEnd: null
      };
    case actionTypes.POMODORO_COMPLETED:
      const newCompletedSessions = state.completedSessions + 1;
      return {
        ...state,
        pomodoros: [...state.pomodoros, action.newPomodoro],
        completedSessions: newCompletedSessions
      };
    case actionTypes.GET_POMODOROS:
      return { ...state, pomodoros: action.pomodoros };
    case actionTypes.END_POMODORO_5_SECONDS:
      return { ...state, timer: 5 };
    default:
      return state;
  }
};

export default pomodoroReducer