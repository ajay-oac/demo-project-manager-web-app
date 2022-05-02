import React from "react";
import classes from "./UserIcon.module.scss";

const UserIcon = (props) => {
  const userIconStyle = {
    width: `${props.size}`,
    height: `${props.size}`,
  };

  return (
    <div
      style={userIconStyle}
      className={classes["user-icon"]}
      onClick={props.onClickHandler}
    >
      <img
        src={
          props.userImage
            ? `data:image/png;base64,${props.userImage}`
            : "images/default-user-image.png"
        }
        alt="user icon"
      />
    </div>
  );
};

export default UserIcon;
