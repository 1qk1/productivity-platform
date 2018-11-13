import * as actionTypes from "../actions/actionTypes";

const initialState = {
  timer: 1500,
  intervalId: null,
  pomodoros: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_TIMER:
      return {
        ...state,
        timer: 1500,
        intervalId: action.intervalId
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
      return state;
    case actionTypes.GET_POMODOROS:
      return { ...state, pomodoros: action.pomodoros };
    default:
      return state;
  }
};
