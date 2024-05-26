import { combineReducers } from "redux";
import colorReducer from "./colorReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  color: colorReducer,
  user: userReducer,
});

export default rootReducer;
