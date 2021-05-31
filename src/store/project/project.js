import * as projectActions from "./projectActions.js";

const initialProjects = {
  projects: [],
  initialProjectsFetched: false,
};

const projectReducer = (state = initialProjects, { type, payload }) => {
  switch (type) {
    case projectActions.LOAD_PROJECTS:
      return {
        initialProjectsFetched: true,
        projects: [...payload.projects],
      };
    case projectActions.CREATE_PROJECT:
      return {
        ...state,
        projects: [...state.projects, payload.newProject],
      };
    default:
      return state;
  }
};

export default projectReducer;
