import React, { Fragment, useState } from "react";
import TextInput from "../../components/inputs/TextInput.js";
import Button from "../../components/buttons/Button.js";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import * as authActions from "../../store/auth/authActions.js";
import FormWrapper from "../../components/form/FormWrapper.js";
import classes from "./login.module.scss";

const Login = (props) => {
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setError] = useState({ username: "", password: "" });

  const nameChangeHandler = ({ target }) => {
    setUsername(target.value);
  };

  const passwordChangeHandler = ({ target }) => {
    setPassword(target.value);
  };

  const validateCredentials = (event) => {
    event.preventDefault();

    // Send request to backend and if successfull do following
    // Hardcoding success and failure cases for now. Implement in then and catch of returning promise from the API
    if (username === "test" && password === "test") {
      setError({ username: "", password: "" });
      props.setUsername("TEST USER");
      props.setAuthToken("TEST TOKEN");
      props.setIsAuthenticated(true);
      history.replace("/");
    } else {
      // Hardcoding the error for now. Set the error to the error returned from API.
      setError({
        username: "Username is incorrect!",
        password: "Password is incorrect!",
      });
    }
  };

  return (
    <Fragment>
      <div className={`flex modal ${classes["login-modal"]}`}>
        <div className={classes["login-illustration"]}>
          <img src="images/sign-in-illustration.jpg" alt="dummy" />
        </div>
        <div className={classes["login-form"]}>
          <FormWrapper
            formTitle="login to access your account."
            onSubmitHandler={validateCredentials}
          >
            <TextInput
              id="username"
              type="text"
              label="Username"
              hideLabel={true}
              value={username}
              onChangeHandler={nameChangeHandler}
              error={errors.username}
            />
            <TextInput
              id="password"
              type="password"
              label="Password"
              hideLabel={true}
              value={password}
              onChangeHandler={passwordChangeHandler}
              error={errors.password}
            />
            <Button
              type="submit"
              label="sign in"
              buttonType="pill"
              gutter="top"
            />
          </FormWrapper>
        </div>
      </div>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUsername: (username) =>
      dispatch({ type: authActions.SET_USERNAME, payload: { username } }),
    setUserImage: (userImage) =>
      dispatch({ type: authActions.SET_USER_IMAGE, payload: { userImage } }),
    setAuthToken: (authToken) =>
      dispatch({ type: authActions.SET_AUTH_TOKEN, payload: { authToken } }),
    setIsAuthenticated: (isAuthenticated) =>
      dispatch({
        type: authActions.SET_IS_AUTHENTICATED,
        payload: { isAuthenticated },
      }),
  };
};

export default connect(null, mapDispatchToProps)(Login);
