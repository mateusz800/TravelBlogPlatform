import { mediaActions } from "../actions/types";

function mediaReducer(state = [], action) {
  switch (action.type) {
    case mediaActions.ADD_NEW_PHOTO:
      const name =`new_${action.photoType}_photo`;
      return {
        ...state,
        [name]: action.payload
      };
      case mediaActions.GET_USER_MEDIA:
        return{
          ...state,
          userMedia: action.payload
        }
    default:
      return state;
  }
}

export default mediaReducer;
