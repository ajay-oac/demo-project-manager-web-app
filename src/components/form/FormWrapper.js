import React, { Fragment } from "react";
import classes from "./FormWrapper.module.scss";

const FormWrapper = (props) => {
  const formStyle = {
    width: props.size || "",
    minHeight: props.size || "",
  };

  return (
    <Fragment>
      <form
        style={formStyle}
        className={classes.form}
        onSubmit={props.onSubmitHandler}
      >
        <h2>{props.formTitle}</h2>
        {props.children}
      </form>
    </Fragment>
  );
};

export default FormWrapper;
