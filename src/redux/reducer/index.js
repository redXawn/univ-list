/* istanbul ignore file */

import { combineReducers } from "redux";
import universitiesReducer from "./universitiesReducer";
import loadingReducer from "./loadingReducer";
import errorReducer from "./errorReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  universitiesReducer,
  loadingReducer,
  errorReducer,
  userReducer,
});

export default rootReducer;
