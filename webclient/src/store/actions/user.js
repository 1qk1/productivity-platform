import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const checkAuth = () => {
  return dispatch => {
    // get the token from localStorage
    const token = localStorage.getItem("token");
    // if token exists
    if (token !== null) {
      // add token to Authorization header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get("/auth/getUser")
        .then(response => {
          // dispatch AUTH_SUCCESS
          dispatch({
            type: actionTypes.AUTH_SUCCESS,
            token,
            user: response.data.user
          });
        })
        .catch(() => {
          dispatch(logoutHandler());
        });
    } else {
      // if there isn't a token
      // logout
      dispatch(logoutHandler());
    }
  };
};

export const authSuccess = (token, user) => {
  return dispatch => {
    dispatch({ type: actionTypes.AUTH_SUCCESS, token, user });
  };
};

export const logoutHandler = () => {
  return dispatch => {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
    dispatch({ type: actionTypes.AUTH_LOGOUT });
  };
};

// store actions

export const addExtension = extensionName => dispatch => {
  axios.post("/extensions", { extensionName }).then(() => {
    dispatch({ type: actionTypes.ADD_EXTENSION, extensionName });
  });
};
export const removeExtension = extensionName => dispatch => {
  axios.delete(`/extensions/${extensionName}`).then(() => {
    dispatch({ type: actionTypes.REMOVE_EXTENSION, extensionName });
  });
};
