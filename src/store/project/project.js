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
    case projectActions.DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.id !== payload.projectId
        ),
      };
    case projectActions.UPDATE_PROJECT:
      const updateIndex = state.projects.findIndex(
        (project) => project.id === payload.updatedProject.id
      );
      const projects = [...state.projects];
      projects.splice(updateIndex, 1, payload.updatedProject);
      return {
        ...state,
        projects,
      };
    default:
      return state;
  }
};

export default projectReducer;
