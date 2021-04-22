import { combineReducers } from "redux";
import auth from "./authReducer";
import todos from './todoReducer'

export default combineReducers({
  auth,
  todos
});
