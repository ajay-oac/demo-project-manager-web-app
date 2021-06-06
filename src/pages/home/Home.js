import React, { useEffect } from "react";
import Button from "../../components/buttons/Button.js";
import classes from "./Home.module.scss";
import { connect } from "react-redux";
import { loadProjects } from "../../store/project/projectActionCreators.js";
import { useHistory } from "react-router";
import List from "../../components/list/List.js";

const Home = (props) => {
  const history = useHistory();

  useEffect(() => {
    if (!props.initialProjectsFetched) props.loadProjects();
  }, []);

  let mainClasses = "";
  let projects = null;
  if (props.projects.length) {
    mainClasses = "";

    projects = <List items={props.projects} />;
  } else {
    mainClasses = `flex ${classes["no-projects-main"]}`;

    projects = (
      <div>
        <span>No Projects!</span>
        <span>Start adding projects by clicking on the button below.</span>
      </div>
    );
  }

  const toCreateProject = () => {
    history.push("/create-project");
  };

  return (
    <main className={mainClasses}>
      {projects}
      <div className={classes["add-project-button"]}>
        <Button
          label={<i className="fa fa-plus"></i>}
          buttonType="circular"
          size="65px"
          fontSize="40px"
          onClickHandler={toCreateProject}
        />
      </div>
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    projects: state.project.projects,
    initialProjectsFetched: state.project.initialProjectsFetched,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadProjects: () => dispatch(loadProjects()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
