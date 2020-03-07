import { profileActions } from "../actions/types";

const initialState = {
  is_authenticated: false
}

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case profileActions.GET_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    case profileActions.CHECK_IF_LOGGED:
      return {
        ...state,
        is_authenticated: action.payload
      }
    case profileActions.LOGIN:
      return {
        ...state,
        is_authenticated: true,
        user_pk: action.payload
      }
    case profileActions.LOGOUT:
      return {
        ...state,
        is_authenticated: false,
        user_pk: null
      }
    case profileActions.SET_UPLOADED_PHOTOT_TYPE:
      return {
        ...state,
        updatedPhotoType: action.payload
      }
    default:
      return state;
  }
}

export default profileReducer;
