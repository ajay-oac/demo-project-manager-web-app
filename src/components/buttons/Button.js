import React, { Fragment, memo } from "react";
import classes from "./Button.module.scss";

const Button = (props) => {
  let buttonStyles = null;
  switch (props.buttonType) {
    case "pill":
      buttonStyles = {
        borderRadius: "20px",
        width: props.size || "",
        fontSize: props.fontSize || "",
      };
      break;
    case "circular":
      buttonStyles = {
        borderRadius: "50%",
        width: props.size || "30px",
        height: props.size || "30px",
        fontSize: props.fontSize || "",
      };
      break;
    default:
      buttonStyles = {
        fontSize: props.fontSize || "",
      };
  }

  switch (props.gutter) {
    case "top":
      buttonStyles.marginTop = "1rem";
      break;
    case "bottom":
      buttonStyles.marginBottom = "1rem";
      break;
    default:
      break;
  }

  return (
    <Fragment>
      <button
        className={`flex ${classes.button}`}
        style={buttonStyles}
        type={props.type}
        onClick={props.onClickHandler}
        disabled={props.disabled}
      >
        {props.label}
      </button>
    </Fragment>
  );
};

export default memo(Button);
