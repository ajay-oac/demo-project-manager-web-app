import React, { useCallback, useReducer } from "react";
import Button from "../../components/buttons/Button";
import classes from "./CreateProject.module.scss";
import ImageInput from "../../components/inputs/ImageInput.js";
import FormWrapper from "../../components/form/FormWrapper.js";
import TextInput from "../../components/inputs/TextInput.js";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { createProject } from "../../store/project/projectActionCreators.js";
import * as projectFormActions from "../../utilities/project-form/projectFormActions.js";
import {
  initialFormState,
  projectFormReducer,
} from "../../utilities/project-form/projectFormReducer.js";

const CreateProject = (props) => {
  const [createProjectFormState, dispatch] = useReducer(
    projectFormReducer,
    initialFormState
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
    return createProjectFormState.projectName &&
      createProjectFormState.projectManager &&
      createProjectFormState.clientName &&
      createProjectFormState.numberOfMembers &&
      !createProjectFormState.errors.projectName &&
      !createProjectFormState.errors.projectManager &&
      !createProjectFormState.errors.clientName &&
      !createProjectFormState.errors.numberOfMembers
      ? false
      : true;
  };
  const buttonDisabledStatus = checkButtonDisabled();

  const toPreviousPage = useCallback(() => history.goBack(), [history]);

  const addProject = async (event) => {
    event.preventDefault();

    const newProject = {
      projectName: createProjectFormState.projectName,
      projectManager: createProjectFormState.projectManager,
      clientName: createProjectFormState.clientName,
      numberOfMembers: createProjectFormState.numberOfMembers,
    };

    const successfullyCreated = await props.addProject(newProject);
    if (successfullyCreated) history.replace("/");
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
          image={createProjectFormState.projectImage}
          onChangeHandler={handleImageUpload}
        />
        <FormWrapper
          formTitle="create a new project"
          size="450px"
          onSubmitHandler={addProject}
        >
          <TextInput
            id="project-name"
            type="text"
            label="Project Name"
            hideLabel={true}
            onChangeHandler={fieldChangeHandler}
            error={createProjectFormState.errors.projectName}
          />
          <TextInput
            id="project-manager"
            type="text"
            label="Project Manager"
            hideLabel={true}
            onChangeHandler={fieldChangeHandler}
            error={createProjectFormState.errors.projectManager}
          />
          <TextInput
            id="client-name"
            type="text"
            label="Client Name"
            hideLabel={true}
            onChangeHandler={fieldChangeHandler}
            error={createProjectFormState.errors.clientName}
          />
          <TextInput
            id="number-of-members"
            type="number"
            label="Number of Members"
            hideLabel={true}
            onChangeHandler={fieldChangeHandler}
            error={createProjectFormState.errors.numberOfMembers}
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
    addProject: (newProject) => dispatch(createProject(newProject)),
  };
};

export default connect(null, mapDispatchToProp)(CreateProject);
