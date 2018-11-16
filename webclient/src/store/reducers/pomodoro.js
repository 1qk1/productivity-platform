import * as actionTypes from "../actions/actionTypes";

const initialState = {
  timer: 1500,
  intervalId: null,
  pomodoros: [],
  isPomodoro: true
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
      return {
        ...state,
        timer: 300,
        // intervalId: action.intervalId,
        isPomodoro: false
      };
    case actionTypes.DEC_TIMER:
      return {
        ...state,
        timer: state.timer - 1
      };
    case actionTypes.STOP_TIMER:
      clearInterval(state.intervalId);
      return { ...state, intervalId: null };
    case actionTypes.POMODORO_COMPLETED:
      return { ...state, pomodoros: [...state.pomodoros, action.newPomodoro] };
    case actionTypes.GET_POMODOROS:
      return { ...state, pomodoros: action.pomodoros };
    case "TEST":
      return { ...state, timer: 5 };
    default:
      return state;
  }
};
