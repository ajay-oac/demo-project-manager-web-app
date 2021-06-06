import React from "react";
import Button from "../../components/buttons/Button";
import classes from "../create-project/CreateProject.module.scss";
import ImageInput from "../../components/inputs/ImageInput.js";
import FormWrapper from "../../components/form/FormWrapper.js";
import TextInput from "../../components/inputs/TextInput.js";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { updateProject } from "../../store/project/projectActionCreators.js";
import useProjectForm from "../../hooks/useProjectForm.js";

const EditProject = (props) => {
  const params = useParams();

  const {
    projectFormState,
    handleImageUpload,
    fieldChangeHandler,
    buttonDisabledStatus,
    toPreviousPage,
    history,
  } = useProjectForm({
    ...props.getProject(params.projectId),
    errors: {
      projectName: "",
      projectManager: "",
      clientName: "",
      numberOfMembers: "",
    },
  });

  const updateProject = async (event) => {
    event.preventDefault();

    const updatedProject = {
      id: projectFormState.id,
      projectName: projectFormState.projectName,
      projectManager: projectFormState.projectManager,
      clientName: projectFormState.clientName,
      numberOfMembers: projectFormState.numberOfMembers,
      projectImage: projectFormState.projectImage,
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
          image={projectFormState.projectImage}
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
            value={projectFormState.projectName}
            onChangeHandler={fieldChangeHandler}
            error={projectFormState.errors.projectName}
          />
          <TextInput
            id="project-manager"
            type="text"
            label="Project Manager"
            hideLabel={true}
            value={projectFormState.projectManager}
            onChangeHandler={fieldChangeHandler}
            error={projectFormState.errors.projectManager}
          />
          <TextInput
            id="client-name"
            type="text"
            label="Client Name"
            hideLabel={true}
            value={projectFormState.clientName}
            onChangeHandler={fieldChangeHandler}
            error={projectFormState.errors.clientName}
          />
          <TextInput
            id="number-of-members"
            type="number"
            label="Number of Members"
            hideLabel={true}
            value={projectFormState.numberOfMembers}
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
    updateProject: (updatedProject) => dispatch(updateProject(updatedProject)),
  };
};

const mapStateToProps = (state) => {
  return {
    getProject: (projectId) =>
      state.project.projects.find((project) => {
        return project.id == projectId;
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(EditProject);
