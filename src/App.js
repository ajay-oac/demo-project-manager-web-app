import "./App.scss";
import React, { Fragment } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import * as authActions from "./store/auth/authActions.js";
import Login from "./pages/login/login.js";
import Home from "./pages/home/Home.js";
import Header from "./components/header/Header.js";
import CreateProject from "./pages/create-project/CreateProject";
import EditProject from "./pages/edit-project/EditProject";

function App(props) {
  const location = useLocation();

  const logoutUser = () => {
    props.removeUsername();
    props.clearAuthToken();
    props.unAuthenticateUser();
  };

  const checkAuthAndRoute = (Comp, compProps) => {
    return props.isAuthenticated ? (
      <Comp {...compProps} />
    ) : (
      <Redirect to="/login" />
    );
  };

  return (
    <Fragment>
      {props.isAuthenticated && location.pathname !== "/login" ? (
        <Header
          username={props.username}
          userImage={props.userImage}
          handleLogout={logoutUser}
        />
      ) : null}
      <Switch>
        <Route path="/" exact>
          {checkAuthAndRoute(Home, null)}
        </Route>
        <Route path="/create-project" exact>
          {checkAuthAndRoute(CreateProject, null)}
        </Route>
        <Route path="/edit-project/:projectId" exact>
          {checkAuthAndRoute(EditProject, null)}
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/*">
          {props.isAuthenticated ? (
            <Redirect to="/" />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
      </Switch>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    username: state.auth.username,
    userImage: state.auth.userImage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    unAuthenticateUser: () =>
      dispatch({
        type: authActions.SET_IS_AUTHENTICATED,
        payload: { isAuthenticated: false },
      }),
    removeUsername: () =>
      dispatch({ type: authActions.SET_USERNAME, payload: { username: "" } }),
    removeUserImage: () =>
      dispatch({
        type: authActions.SET_USER_IMAGE,
        payload: { userImage: "" },
      }),
    clearAuthToken: () =>
      dispatch({
        type: authActions.SET_AUTH_TOKEN,
        payload: { authToken: "" },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
