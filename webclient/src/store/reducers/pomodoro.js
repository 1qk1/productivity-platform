const initialState = {
  timer: 1500,
  intervalId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "START_TIMER":
      console.log("start timer");
      if (state.timer !== null) {
        return {
          ...state,
          timer: 1500,
          intervalId: action.intervalId
        };
      } else {
        break;
      }
    case "DEC_TIMER":
      console.log("dec timer");
      return {
        ...state,
        timer: state.timer - 1
      };
    case "STOP_TIMER":
      clearInterval(state.intervalId);
      return { ...state, intervalId: null };
    default:
      return state;
  }
};
