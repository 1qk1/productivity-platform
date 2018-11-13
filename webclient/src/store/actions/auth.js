import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const checkAuth = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      const user = JSON.parse(localStorage.getItem("user"));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      dispatch({ type: actionTypes.AUTH_SUCCESS, token, user });
    } else {
      dispatch({ type: actionTypes.AUTH_LOGOUT });
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
