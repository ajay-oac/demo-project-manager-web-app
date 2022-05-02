export const getUserDetailsFromAuth = (state) => ({
  username: state.auth.username,
  userImage: state.auth.userImage,
  isAuthenticated: state.auth.isAuthenticated,
});

export const getLoginErrorFromAuth = (state) => state.auth.error;
