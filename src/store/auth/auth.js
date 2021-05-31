import * as authActions from "./authActions.js";

const initialAuthState = {
  username: "",
  isAuthenticated: false,
  authToken: "",
  userImage: "",
};

const authReducer = (state = initialAuthState, { type, payload }) => {
  switch (type) {
    case authActions.SET_USERNAME:
      return {
        ...state,
        username: payload.username,
      };
    case authActions.SET_AUTH_TOKEN:
      return {
        ...state,
        authToken: payload.authToken,
      };
    case authActions.SET_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: payload.isAuthenticated,
      };
    case authActions.SET_USER_IMAGE:
      return {
        ...state,
        userImage: payload.userImage,
      };
    default:
      return state;
  }
};

export default authReducer;
