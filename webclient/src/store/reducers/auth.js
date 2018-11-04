import * as actionTypes from "../actions/actionTypes";

const initialState = {
  // undefined = not checked
  // null = not logged in
  token: undefined,
  user: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      console.log("auth started");
      return { ...state, loading: true, error: null };
    case actionTypes.AUTH_SUCCESS:
      return { ...state, loading: false, error: null, token: action.token };
    case actionTypes.AUTH_FAIL:
      return { ...state, loading: false, error: action.error };
    case actionTypes.AUTH_LOGOUT:
      return { ...state, token: null, user: null };
    default:
      return state;
  }
};
