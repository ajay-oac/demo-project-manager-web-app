import * as projectActions from "./projectActions.js";

export const loadProjects = () => {
  return (dispatch) => {
    // Call the backend API here to fetch all the projects and in success do following
    // Hardcoding the projects for now.
    /*const projects = [
      { id: 123, projectName: "Project A", projectManager: "Ajay" },
      { id: 1293, projectName: "Project B", projectManager: "Ajay" },
      { id: 1423, projectName: "Project C", projectManager: "Ajay" },
      { id: 1213, projectName: "Project D", projectManager: "Ajay" },
      { id: 555, projectName: "Project E", projectManager: "Ajay" },
    ];*/
    const projects = [];

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
      } else reject(false);
    });
  };
};

export const deleteProject = (projectId) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      // Call the backend API to delete the project from the Database and in success do following.
      // Hardcoding success case for now.
      const callToApiSuccessfull = true;
      if (callToApiSuccessfull) {
        dispatch({
          type: projectActions.DELETE_PROJECT,
          payload: { projectId },
        });
        resolve(true);
      } else reject(false);
    });
  };
};

export const updateProject = (updatedProject) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      // Call the backend API to update project in the database and in succes do following.
      // Hardcoding the success case for now.
      const callToApiSuccessfull = true;
      if (callToApiSuccessfull) {
        dispatch({
          type: projectActions.UPDATE_PROJECT,
          payload: { updatedProject },
        });
        resolve(true);
      } else reject(false);
    });
  };
};
