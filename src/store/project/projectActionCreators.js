import * as projectActions from "./projectActions.js";

export const loadProjects = () => {
  return (dispatch) => {
    // Call the backend API here to fetch all the projects and in success do following
    // Hardcoding the projects for now.
    const projects = [
      { id: 123, name: "Project A" },
      { id: 1293, name: "Project B" },
      { id: 1423, name: "Project C" },
      { id: 1213, name: "Project D" },
      { id: 555, name: "Project E" },
    ];
    //const projects = [];

    dispatch({ type: projectActions.LOAD_PROJECTS, payload: { projects } });
  };
};

export const createProject = (newProject) => {
  return (dispatch) => {
    // Call the backend API here to save new project in the database and in success do following
    dispatch({ type: projectActions.CREATE_PROJECT, payload: { newProject } });
  };
};
