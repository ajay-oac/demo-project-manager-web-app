import "./App.scss";
import React, { Fragment, useEffect } from "react";
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "./store/auth/authActionCreators.js";
import { getUserDetailsFromAuth } from "./store/auth/authSelectors";
import Login from "./pages/login/login.js";
import Home from "./pages/home/Home.js";
import Header from "./components/header/Header.js";
import CreateProject from "./pages/create-project/CreateProject";
import EditProject from "./pages/edit-project/EditProject";

function App({ userDetails, logout }) {
  const { isAuthenticated, username, userImage } = userDetails;

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    isAuthenticated && history.replace("/");
  }, [isAuthenticated]);

  const logoutUser = () => logout();
  console.log("this is test console");

  const checkAuthAndRoute = (Comp, compProps) =>
    isAuthenticated ? <Comp {...compProps} /> : <Redirect to="/login" />;

  return (
    <Fragment>
      {isAuthenticated && location.pathname !== "/login" ? (
        <Header
          username={username}
          userImage={userImage}
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
          {isAuthenticated ? <Redirect to="/" /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  userDetails: getUserDetailsFromAuth(state),
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
