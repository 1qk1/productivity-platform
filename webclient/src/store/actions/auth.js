import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const checkAuth = () => {
  return dispatch => {
    // get the token from localStorage
    const token = localStorage.getItem("token");
    // if token exists
    if (token !== null) {
      // get user data
      const user = JSON.parse(localStorage.getItem("user"));
      // add token to Authorization header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // and dispatch AUTH_SUCCESS
      dispatch({ type: actionTypes.AUTH_SUCCESS, token, user });
    } else {
      // if there isn't a token
      // logout
      dispatch(logoutHandler());
    }
  };
};

export const authHandler = (authType, data) => {
  return dispatch => {
    dispatch({ type: actionTypes.AUTH_START });
    // send the data
    axios
      .post(`/auth/${authType}`, data)
      .then(res => {
        console.log(res.data);
        const { token, user } = res.data;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({ type: actionTypes.AUTH_SUCCESS, token, user });
      })
      .catch(error => {
        dispatch({ type: actionTypes.AUTH_FAIL, error });
      });
  };
};

export const logoutHandler = () => {
  return dispatch => {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: actionTypes.AUTH_LOGOUT });
  };
};
