import * as actionTypes from "../actions/actionTypes";

const initialState = {
  timer: 1500,
  intervalId: null,
  pomodoros: [],
  // isPomodoro true = pomodoro runnning
  // false = break running
  isPomodoro: true,
  completedSessions: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_TIMER:
      return {
        ...state,
        timer: 1500,
        intervalId: action.intervalId ? action.intervalId : state.intervalId,
        isPomodoro: true
      };
    case actionTypes.START_BREAK:
      let breakTime = 300;
      // if it's the 4th pomodoro, start a 10 minute break
      if ((state.completedSessions + 1) % 4 === 0) breakTime = 600;
      return {
        ...state,
        timer: breakTime,
        isPomodoro: false
      };
    case actionTypes.DEC_TIMER:
      return {
        ...state,
        timer: state.timer - 1
      };
    case actionTypes.STOP_TIMER:
      clearInterval(state.intervalId);
      return { ...state, intervalId: null, completedSessions: 0 };
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
