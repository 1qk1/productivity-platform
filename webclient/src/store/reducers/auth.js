import * as actionTypes from "../actions/actionTypes";
import _ from "lodash";

const initialState = {
  // undefined = not checked
  // null = not logged in
  token: undefined,
  user: null,
  loading: false,
  // read error message on error.response.data
  error: null
};

export default (state = initialState, action) => {
  let newState = _.cloneDeep(state);
  switch (action.type) {
    case actionTypes.AUTH_START:
      return { ...state, loading: true, error: null };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        token: action.token,
        user: action.user
      };
    case actionTypes.AUTH_FAIL:
      return { ...state, loading: false, error: action.error };
    case actionTypes.AUTH_LOGOUT:
      return { ...state, token: null, user: null };
    case actionTypes.ADD_EXTENSION: {
      newState.user.extensions.push(action.extensionName);
      return newState;
    }
    case actionTypes.REMOVE_EXTENSION: {
      const filtered = newState.user.extensions.filter(
        e => e !== action.extensionName
      );
      newState.user.extensions = filtered;
      return newState;
    }
    default:
      return state;
  }
};
