import React, { useCallback, useReducer } from "react";
import Button from "../../components/buttons/Button";
import classes from "../create-project/CreateProject.module.scss";
import ImageInput from "../../components/inputs/ImageInput.js";
import FormWrapper from "../../components/form/FormWrapper.js";
import TextInput from "../../components/inputs/TextInput.js";
import { useHistory, useParams } from "react-router";
import { connect } from "react-redux";
import { updateProject } from "../../store/project/projectActionCreators.js";
import * as projectFormActions from "../../utilities/project-form/projectFormActions.js";
import { projectFormReducer } from "../../utilities/project-form/projectFormReducer.js";

const EditProject = (props) => {
  const params = useParams();

  const [editProjectFormState, dispatch] = useReducer(projectFormReducer, {
    ...props.getProject(params.projectId),
    errors: {
      projectName: "",
      projectManager: "",
      clientName: "",
      numberOfMembers: "",
    },
  });

  console.log(
    props.getProject(params.projectId),
    "editProjectFormState is: ",
    editProjectFormState
  );

  const history = useHistory();

  const handleImageUpload = (image) => {
    dispatch({ type: projectFormActions.SET_PROJECT_IMAGE, payload: image });
  };

  const fieldChangeHandler = ({ target }) => {
    const fieldValue = target.value;

    const updateStore = (
      actionType,
      shouldSetError,
      errorActionType,
      errorMessage
    ) => {
      dispatch({ type: actionType, payload: fieldValue });
      if (shouldSetError)
        dispatch({ type: errorActionType, payload: errorMessage });
      else dispatch({ type: errorActionType, payload: "" });
    };

    switch (target.id) {
      case "project-name":
        if (fieldValue)
          updateStore(
            projectFormActions.SET_PROJECT_NAME,
            false,
            projectFormActions.SET_PROJECT_NAME_ERROR,
            ""
          );
        else
          updateStore(
            projectFormActions.SET_PROJECT_NAME,
            true,
            projectFormActions.SET_PROJECT_NAME_ERROR,
            "This field is required."
          );
        break;
      case "project-manager":
        if (fieldValue)
          updateStore(
            projectFormActions.SET_PROJECT_MANAGER,
            false,
            projectFormActions.SET_PROJECT_MANAGER_ERROR,
            ""
          );
        else
          updateStore(
            projectFormActions.SET_PROJECT_MANAGER,
            true,
            projectFormActions.SET_PROJECT_MANAGER_ERROR,
            "This field is required."
          );
        break;
      case "client-name":
        if (fieldValue)
          updateStore(
            projectFormActions.SET_CLIENT_NAME,
            false,
            projectFormActions.SET_CLIENT_NAME_ERROR,
            ""
          );
        else
          updateStore(
            projectFormActions.SET_CLIENT_NAME,
            true,
            projectFormActions.SET_CLIENT_NAME_ERROR,
            "This field is required."
          );
        break;
      case "number-of-members":
        if (fieldValue) {
          if (fieldValue > 0)
            updateStore(
              projectFormActions.SET_NUMBER_OF_MEMBERS,
              false,
              projectFormActions.SET_NUMBER_OF_MEMBERS_ERROR,
              ""
            );
          else
            updateStore(
              projectFormActions.SET_NUMBER_OF_MEMBERS,
              true,
              projectFormActions.SET_NUMBER_OF_MEMBERS_ERROR,
              "AT least one member is required."
            );
        } else
          updateStore(
            projectFormActions.SET_NUMBER_OF_MEMBERS,
            true,
            projectFormActions.SET_NUMBER_OF_MEMBERS_ERROR,
            "This field is required."
          );
        break;
      default:
        return;
    }
  };

  const checkButtonDisabled = () => {
    console.log(
      "came in checkButtonDisabled...",
      editProjectFormState.projectName
    );
    return editProjectFormState.projectName &&
      editProjectFormState.projectManager &&
      editProjectFormState.clientName &&
      editProjectFormState.numberOfMembers &&
      !editProjectFormState.errors.projectName &&
      !editProjectFormState.errors.projectManager &&
      !editProjectFormState.errors.clientName &&
      !editProjectFormState.errors.numberOfMembers
      ? false
      : true;
  };
  const buttonDisabledStatus = checkButtonDisabled();

  const toPreviousPage = useCallback(() => history.goBack(), [history]);

  const updateProject = async (event) => {
    event.preventDefault();

    const updatedProject = {
      id: editProjectFormState.id,
      projectName: editProjectFormState.projectName,
      projectManager: editProjectFormState.projectManager,
      clientName: editProjectFormState.clientName,
      numberOfMembers: editProjectFormState.numberOfMembers,
      projectImage: editProjectFormState.projectImage,
    };

    const successfullyUpdated = await props.updateProject(updatedProject);
    if (successfullyUpdated) history.replace("/");

    //wrap in try catch and handle error case.
  };

  return (
    <main className={classes["create-project-main"]}>
      <div className={classes["top-content"]}>
        <Button
          buttonType="pill"
          label="back"
          size="168px"
          onClickHandler={toPreviousPage}
        />
      </div>
      <div className={classes["create-project-form-container"]}>
        <ImageInput
          size="450px"
          image={editProjectFormState.projectImage}
          onChangeHandler={handleImageUpload}
        />
        <FormWrapper
          formTitle="edit the project details"
          size="450px"
          onSubmitHandler={updateProject}
        >
          <TextInput
            id="project-name"
            type="text"
            label="Project Name"
            hideLabel={true}
            value={editProjectFormState.projectName}
            onChangeHandler={fieldChangeHandler}
            error={editProjectFormState.errors.projectName}
          />
          <TextInput
            id="project-manager"
            type="text"
            label="Project Manager"
            hideLabel={true}
            value={editProjectFormState.projectManager}
            onChangeHandler={fieldChangeHandler}
            error={editProjectFormState.errors.projectManager}
          />
          <TextInput
            id="client-name"
            type="text"
            label="Client Name"
            hideLabel={true}
            value={editProjectFormState.clientName}
            onChangeHandler={fieldChangeHandler}
            error={editProjectFormState.errors.clientName}
          />
          <TextInput
            id="number-of-members"
            type="number"
            label="Number of Members"
            hideLabel={true}
            value={editProjectFormState.numberOfMembers}
            onChangeHandler={fieldChangeHandler}
            error={editProjectFormState.errors.numberOfMembers}
          />
          <Button
            label="submit"
            buttonType="pill"
            gutter="top"
            disabled={buttonDisabledStatus}
          />
        </FormWrapper>
      </div>
    </main>
  );
};

const mapDispatchToProp = (dispatch) => {
  return {
    updateProject: (updatedProject) => dispatch(updateProject(updatedProject)),
  };
};

const mapStateToProps = (state) => {
  return {
    getProject: (projectId) =>
      state.project.projects.find((project) => {
        console.log(project.id == projectId, project.id, projectId);
        return project.id == projectId;
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(EditProject);
