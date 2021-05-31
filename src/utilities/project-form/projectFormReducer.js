import * as projectFormActions from "./projectFormActions.js";

export const initialFormState = {
  projectName: "",
  projectManager: "",
  clientName: "",
  numberOfMembers: "",
  projectImage: "",
  errors: {
    projectName: "",
    projectManager: "",
    clientName: "",
    numberOfMembers: "",
  },
};

export const projectFormReducer = (state, { type, payload }) => {
  switch (type) {
    case projectFormActions.SET_PROJECT_IMAGE:
      return {
        ...state,
        projectImage: payload,
      };
    case projectFormActions.SET_PROJECT_NAME:
      return {
        ...state,
        projectName: payload,
      };
    case projectFormActions.SET_PROJECT_MANAGER:
      return {
        ...state,
        projectManager: payload,
      };
    case projectFormActions.SET_CLIENT_NAME:
      return {
        ...state,
        clientName: payload,
      };
    case projectFormActions.SET_NUMBER_OF_MEMBERS:
      return {
        ...state,
        numberOfMembers: payload,
      };
    case projectFormActions.SET_PROJECT_NAME_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          projectName: payload,
        },
      };
    case projectFormActions.SET_PROJECT_MANAGER_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          projectManager: payload,
        },
      };
    case projectFormActions.SET_CLIENT_NAME_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          clientName: payload,
        },
      };
    case projectFormActions.SET_NUMBER_OF_MEMBERS_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          numberOfMembers: payload,
        },
      };
    default:
      return state;
  }
};
