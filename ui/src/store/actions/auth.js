import axios from "axios";
import jwt_decode from "jwt-decode";
import Service from "../../service/Service";
import { GET_ERRORS, SET_CURRENT_USER } from "../types";
/** Login User */
export const loginUser = (userData) => async (dispatch) => {
  try {
    const { data } = await Service.loginUser(userData);
    localStorage.setItem("jwtToken", data.token);
    // Set token to Auth header
    Service.setAuthToken(data.token);
    // Decode token to get user data
    const decoded = jwt_decode(data.token);
    // Set current user
    dispatch(setCurrentUser(decoded));
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const logoutUser = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  Service.setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  window.location.replace("http://" + window.location.host + "/login");
};
