import React, { useState } from "react";
import classes from "./TextInput.module.scss";

const TextInput = (props) => {
  const [labelActiveStyle, setLabelActiveStyle] = useState({});

  const toggleLabelActive = (active) => {
    active && !props.error
      ? setLabelActiveStyle({
          color: "#001a38",
        })
      : setLabelActiveStyle({});
  };

  const onFocusHandler = (event) => {
    toggleLabelActive(true);

    if (props.onFocusHandler) props.onFocusHandler(event);
  };

  const onBlurHandler = (event) => {
    toggleLabelActive(false);

    if (props.onBlurHandler) props.onBlurHandler(event);
  };

  const inputErrorStyle = props.error
    ? { borderBottomColor: "rgb(244, 67, 54)" }
    : null;

  const labelErrorStyle = props.error ? { color: "rgb(244, 67, 54)" } : null;

  return (
    <div className={classes["text-input-container"]}>
      {!props.hideLabel ? (
        <label
          htmlFor={props.id}
          style={{ ...labelActiveStyle, ...labelErrorStyle }}
        >
          {props.label}
        </label>
      ) : null}
      <input
        id={props.id}
        type={props.type}
        placeholder={props.hideLabel ? props.label : ""}
        value={props.value}
        onChange={props.onChangeHandler}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        style={inputErrorStyle}
      />
      {props.error ? <span>{props.error}</span> : null}
    </div>
  );
};

export default TextInput;
