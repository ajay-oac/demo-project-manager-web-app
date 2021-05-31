import * as projectActions from "./projectActions.js";

const initialProjects = [];

const projectReducer = (state = initialProjects, { type, payload }) => {
  switch (type) {
    case projectActions.LOAD_PROJECTS:
      return [...payload.projects];
    case projectActions.CREATE_PROJECT:
      return [...state, payload.newProject];
    default:
      return state;
  }
};

export default projectReducer;
