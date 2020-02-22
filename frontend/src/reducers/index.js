import { combineReducers } from "redux";
import storiesReducer from "./storiesReducer";
import profileReducer from "./profileReducer";
import mediaReducer from "./mediaReducer";

const rootReducer = combineReducers({
  stories: storiesReducer,
  profiles: profileReducer,
  media: mediaReducer
});

export default rootReducer;
