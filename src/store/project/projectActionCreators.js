import * as projectActions from "./projectActions.js";

export const loadProjects = () => {
  return (dispatch) => {
    // Call the backend API here to fetch all the projects and in success do following
    // Hardcoding the projects for now.
    const projects = [
      { id: 123, projectName: "Project A" },
      { id: 1293, projectName: "Project B" },
      { id: 1423, projectName: "Project C" },
      { id: 1213, projectName: "Project D" },
      { id: 555, projectName: "Project E" },
    ];
    //const projects = [];

    dispatch({ type: projectActions.LOAD_PROJECTS, payload: { projects } });
  };
};

export const createProject = (newProject) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      // Call the backend API here to save new project in the database and in success do following
      // Hardcoding call to API as success
      const callToApiSuccessfull = true;
      if (callToApiSuccessfull) {
        // Hardcoding ID returned by API for new project
        const idOfNewObjReturenedByApi = Math.random() + Math.random() * 100;
        newProject.id = idOfNewObjReturenedByApi;
        dispatch({
          type: projectActions.CREATE_PROJECT,
          payload: { newProject },
        });
        resolve(true);
      } else resolve(false);
    });
  };
};
