import { combineReducers } from "redux";
import articleReducer from "./articleReducer";
import profileReducer from "./profileReducer";

const rootReducer = combineReducers({
  articles: articleReducer,
  profiles: profileReducer
});

export default rootReducer;
