import { combineReducers } from "redux";
import universitiesReducer from "./universitiesReducer";
import loadingReducer from "./loadingReducer";
import errorReducer from "./errorReducer";

const rootReducer = combineReducers({
  universitiesReducer,
  loadingReducer,
  errorReducer,
});

export default rootReducer;
