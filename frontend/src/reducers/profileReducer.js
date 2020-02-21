import { profileActions } from "../actions/types";

function articleReducer(state = [], action) {
  switch (action.type) {
    case profileActions.GET_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    default:
      return state;
  }
}

export default articleReducer;
