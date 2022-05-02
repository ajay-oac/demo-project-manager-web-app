import fetch from "../../api/config";
import { SET_USER_DETAILS } from "./authActions";

export const login = (username, password) => {
  return async (dispatch, getState) => {
    const result = await fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    const { error, data, ok } = result;
    if (error || !ok)
      return dispatch({
        type: SET_USER_DETAILS,
        payload: {
          ...getState().auth,
          error: data?.message || "Something went wrong!",
        },
      });

    dispatch({
      type: SET_USER_DETAILS,
      payload: { ...result.data, isAuthenticated: true, error: "" },
    });
  };
};

export const logout = () => {
  return async (dispatch, getState) => {
    const result = await fetch("/auth/logout");
    const { error, data, ok } = result;

    if (error || !ok)
      return dispatch({
        type: SET_USER_DETAILS,
        payload: {
          ...getState().auth,
          error: data?.message || "Something went wrong!",
        },
      });

    dispatch({
      type: SET_USER_DETAILS,
      payload: {
        username: "",
        userImage: "",
        accessToken: "",
        isAuthenticated: false,
        error: "",
      },
    });
  };
};
