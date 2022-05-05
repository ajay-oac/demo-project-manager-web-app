import { SET_ACCESS_TOKEN, SET_USER_DETAILS } from "../store/auth/authActions";
import store from "../store/store";

const baseUrl = "/api/v1";
const tokenRefreshUrl = "/auth/refresh";

const fetchWrapper = async (
  url,
  requestConfig = {},
  shouldTryForTokenRefresh = true
) => {
  try {
    const { accessToken } = store.getState().auth;
    const Authorization = accessToken ? `Bearer ${accessToken}` : null;

    let response = await fetch(`${baseUrl}${url}`, {
      ...requestConfig,
      credentials: "include",
      headers: {
        ...requestConfig.headers,
        "Content-Type": "application/json",
        Authorization,
      },
    });

    const data = await response.json();
    const { status, ok } = response;
    if (status !== 401 || url === "/auth/login") return { status, ok, data };

    if (shouldTryForTokenRefresh) {
      response = await fetch(`${baseUrl}${tokenRefreshUrl}`, {
        credentials: "include",
      });

      const { accessToken, error } = await response.json();
      if (error)
        return store.dispatch({
          type: SET_USER_DETAILS,
          payload: {
            username: "",
            userImage: "",
            accessToken: "",
            isAuthenticated: false,
            error: "",
          },
        });

      store.dispatch({ type: SET_ACCESS_TOKEN, payload: accessToken });
      fetchWrapper(url, requestConfig, false);
    }
  } catch (error) {
    return { error: error.toString() };
  }
};

export default fetchWrapper;
