import React, { Fragment } from "react";
import Button from "../buttons/Button";
import classes from "./ConfirmationModal.module.scss";

const ConfirmationModal = (props) => {
  return (
    <Fragment>
      <div className={classes.overlay}></div>
      <div className={classes["modal-container"]}>
        <div className={`modal ${classes.modal}`}>
          <div>
            <span>{props.message}</span>
          </div>
          <div>
            <Button
              label="confirm"
              buttonType="pill"
              size="128px"
              onClickHandler={props.onConfirm}
            />
            <Button
              label="cancel"
              buttonType="pill"
              size="128px"
              onClickHandler={props.onCancel}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmationModal;
