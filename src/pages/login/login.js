import React, { Fragment, useState } from "react";
import TextInput from "../../components/inputs/TextInput.js";
import Button from "../../components/buttons/Button.js";
import { connect } from "react-redux";
import { login } from "../../store/auth/authActionCreators.js";
import { getLoginErrorFromAuth } from "../../store/auth/authSelectors";
import FormWrapper from "../../components/form/FormWrapper.js";
import classes from "./login.module.scss";

const Login = ({ login, loginErrorMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [hasSignInButtonBeenClicked, setHasSignInButtonBeenClicked] =
    useState(false);

  const nameChangeHandler = ({ target }) => {
    setUsername(target.value);
    hasSignInButtonBeenClicked &&
      setErrors((errors) => ({
        ...errors,
        username: target.value ? "" : "Username is required.",
      }));
  };

  const passwordChangeHandler = ({ target }) => {
    setPassword(target.value);
    hasSignInButtonBeenClicked &&
      setErrors((errors) => ({
        ...errors,
        password: target.value ? "" : "Password is required.",
      }));
  };

  const validateCredentials = (event) => {
    event.preventDefault();

    !hasSignInButtonBeenClicked && setHasSignInButtonBeenClicked(true);

    if (!username)
      setErrors((errors) => ({ ...errors, username: "Username is required." }));
    else if (!password)
      setErrors((errors) => ({ ...errors, password: "Password is required." }));
    else login(username, password);
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
            {loginErrorMessage && (
              <span className={classes["error-message"]}>
                {loginErrorMessage}
              </span>
            )}
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

const mapStateToProps = (state) => ({
  loginErrorMessage: getLoginErrorFromAuth(state),
});

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => dispatch(login(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
