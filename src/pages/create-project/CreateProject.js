import React from "react";
import Button from "../../components/buttons/Button";
import classes from "./CreateProject.module.scss";
import ImageInput from "../../components/inputs/ImageInput.js";
import FormWrapper from "../../components/form/FormWrapper.js";
import TextInput from "../../components/inputs/TextInput.js";
import { connect } from "react-redux";
import { createProject } from "../../store/project/projectActionCreators.js";
import { initialFormState } from "../../utilities/project-form/projectFormReducer.js";
import useProjectForm from "../../hooks/useProjectForm";

const CreateProject = (props) => {
  const {
    projectFormState,
    handleImageUpload,
    fieldChangeHandler,
    buttonDisabledStatus,
    toPreviousPage,
    history,
  } = useProjectForm(initialFormState);

  const addProject = async (event) => {
    event.preventDefault();

    const newProject = {
      projectName: projectFormState.projectName,
      projectManager: projectFormState.projectManager,
      clientName: projectFormState.clientName,
      numberOfMembers: projectFormState.numberOfMembers,
      projectImage: projectFormState.projectImage,
    };

    const successfullyCreated = await props.addProject(newProject);
    if (successfullyCreated) history.replace("/");

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
          image={projectFormState.projectImage}
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
            error={projectFormState.errors.projectName}
          />
          <TextInput
            id="project-manager"
            type="text"
            label="Project Manager"
            hideLabel={true}
            onChangeHandler={fieldChangeHandler}
            error={projectFormState.errors.projectManager}
          />
          <TextInput
            id="client-name"
            type="text"
            label="Client Name"
            hideLabel={true}
            onChangeHandler={fieldChangeHandler}
            error={projectFormState.errors.clientName}
          />
          <TextInput
            id="number-of-members"
            type="number"
            label="Number of Members"
            hideLabel={true}
            onChangeHandler={fieldChangeHandler}
            error={projectFormState.errors.numberOfMembers}
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
