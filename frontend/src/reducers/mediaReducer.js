import { mediaActions } from "../actions/types";

function mediaReducer(state = [], action) {
  switch (action.type) {
    case mediaActions.ADD_NEW_PHOTO:
      return {
        ...state,
        new_photo: action.payload
      };
    default:
      return state;
  }
}

export default mediaReducer;
