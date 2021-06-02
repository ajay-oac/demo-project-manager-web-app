import { createStore, combineReducers, applyMiddleware } from "redux";
import authReducer from "./auth/auth.js";
import projectReducer from "./project/project.js";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
});

const middlewares = applyMiddleware(thunk);

const store = createStore(rootReducer, middlewares);

export default store;
