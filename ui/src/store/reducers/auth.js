import { GET_ERRORS, SET_CURRENT_USER } from "../types";
import _ from "lodash";

// Declară starea inițială de autentificare
const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function (state = initialState, action) {
  // Se face switch pe tipul acțiunii primite de managerul de stare
  switch (action.type) {
    case SET_CURRENT_USER:
      // Setează utilizatorul curent
      return {
        ...state,
        isAuthenticated: !_.isEmpty(action.payload),
        user: action.payload,
      };
    case GET_ERRORS:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
