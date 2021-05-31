import React, { useState } from "react";
import Button from "../../components/buttons/Button";
import classes from "./CreateProject.module.scss";
import ImageInput from "../../components/inputs/ImageInput.js";
import FormWrapper from "../../components/form/FormWrapper.js";
import TextInput from "../../components/inputs/TextInput.js";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { createProject } from "../../store/project/projectActionCreators.js";

const CreateProject = (props) => {
  const [projectImage, setProjectImage] = useState("");

  const history = useHistory();

  const handleImageUpload = (image) => {
    setProjectImage(image);
  };

  const toPreviousPage = () => history.goBack();

  const addProject = () => {
    //do validation
    //create new project obj and pass it to the call down below.

    props.addProject();
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
          image={projectImage}
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
          />
          <TextInput
            id="project-manager"
            type="text"
            label="Project Manager"
            hideLabel={true}
          />
          <TextInput
            id="client-name"
            type="text"
            label="Client Name"
            hideLabel={true}
          />
          <TextInput
            id="number-of-members"
            type="text"
            label="Number of Members"
            hideLabel={true}
          />
          <Button label="submit" buttonType="pill" gutter="top" />
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
