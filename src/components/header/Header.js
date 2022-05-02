import React, { useState, useEffect } from "react";
import classes from "./Header.module.scss";
import UserIcon from "../user-icon/UserIcon.js";

const Header = (props) => {
  const [showUserActions, setShowUserActions] = useState(false);

  const toggleUserActions = () =>
    setShowUserActions((currentStatus) => !currentStatus);

  return (
    <header>
      <div className={classes.logo}>
        <h1>project manager</h1>
      </div>
      <div className={classes["user-info"]}>
        <span className={classes["welcome-message"]}>
          Welcome, {props.username}
        </span>
        <div className={classes["user-icon-container"]}>
          <UserIcon
            onClickHandler={toggleUserActions}
            userImage={props.userImage}
            size="45px"
          />
          {showUserActions ? (
            <ul className="modal">
              <li onClick={props.handleLogout}>
                <span>Sign Out</span>
              </li>
            </ul>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
