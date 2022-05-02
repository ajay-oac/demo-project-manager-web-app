import * as authActions from "./authActions.js";

const { SET_ACCESS_TOKEN, SET_USER_DETAILS } = authActions;

const initialAuthState = {
  username: "",
  isAuthenticated: false,
  accessToken: "",
  userImage: "",
  error: "",
};

const authReducer = (state = initialAuthState, { type, payload }) => {
  switch (type) {
    case SET_USER_DETAILS:
      return {
        ...payload,
      };
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: payload,
      };
    default:
      return state;
  }
};

export default authReducer;
