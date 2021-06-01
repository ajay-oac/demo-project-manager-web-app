import React, { Fragment, useState } from "react";
import { createPortal } from "react-dom";
import Button from "../buttons/Button";
import classes from "./List.module.scss";
import { connect } from "react-redux";
import { deleteProject } from "../../store/project/projectActionCreators.js";
import ConfirmationModal from "../confirmation-modal/ConfirmationModal.js";

const List = (props) => {
  const [
    showDeleteConfirmationModal,
    setShowDeleteConfirmationModal,
  ] = useState(false);

  const [currentDeleteId, setCurrentDeleteId] = useState(null);

  const toggleDeleteConfirmationModal = (
    shouldShow,
    currentDeleteId = null
  ) => {
    setShowDeleteConfirmationModal(shouldShow);
    setCurrentDeleteId(currentDeleteId);
  };

  const deleteProject = async () => {
    console.log("current delete id is : ", currentDeleteId);
    const deletionWasSuccess = await props.deleteProject(currentDeleteId);
    if (deletionWasSuccess) toggleDeleteConfirmationModal(false);
  };

  const deleteButtonLabel = (
    <span>
      <i className="fa fa-trash-o"></i> delete
    </span>
  );
  const editButtonLabel = (
    <span>
      <i className="fa fa-pencil"></i> edit
    </span>
  );

  const items = props.items.map((item) => (
    <li key={item.id}>
      <div className={classes["logo"]}>
        <div>
          <img
            src={item.projectImage || "images/image-upload.png"}
            alt="project logo"
          />
        </div>
      </div>
      <div className={classes.details}>
        <span>{item.projectName}</span>
      </div>
      <div className={classes.details}>
        <span>{item.projectManager}</span>
      </div>
      <div className={classes.details}>
        <span>{item.numberOfMembers}</span>
      </div>
      <div>
        <div>
          <Button buttonType="pill" label={editButtonLabel} />
        </div>
        <div>
          <Button
            buttonType="pill"
            label={deleteButtonLabel}
            onClickHandler={() => toggleDeleteConfirmationModal(true, item.id)}
          />
        </div>
      </div>
    </li>
  ));

  return (
    <Fragment>
      <ul className={classes.list}>
        <li>
          <div className={classes["logo"]}>
            <span>Logo</span>
          </div>
          <div>
            <span>Name</span>
          </div>
          <div>
            <span></span>Manager
          </div>
          <div>
            <span>Members</span>
          </div>
          <div>
            <span>Actions</span>
          </div>
        </li>
        {items}
      </ul>
      {showDeleteConfirmationModal
        ? createPortal(
            <ConfirmationModal
              message="Are you sure you want to delete the Project?"
              onConfirm={deleteProject}
              onCancel={() => toggleDeleteConfirmationModal(false)}
            />,
            document.getElementById("modals-root")
          )
        : null}
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProject: (projectId) => dispatch(deleteProject(projectId)),
  };
};

export default connect(null, mapDispatchToProps)(List);
