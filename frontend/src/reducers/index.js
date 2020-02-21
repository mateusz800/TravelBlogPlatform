import { combineReducers } from "redux";
import storiesReducer from "./storiesReducer";
import profileReducer from "./profileReducer";

const rootReducer = combineReducers({
  stories: storiesReducer,
  profiles: profileReducer
});

export default rootReducer;
