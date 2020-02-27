import { storyActions } from "../actions/types";

const initialState = {
  stories: []
};

function storiesReducer(state = initialState, action) {
  switch (action.type) {
    case storyActions.GET_STORY:
      return {
        ...state,
        stories: action.payload,
        currentStory: {}
      };
    case storyActions.GET_STORY_COUNT:
      return {
        ...state,
        storiesCount: action.payload
      };
    case storyActions.CHANGE_LIST_PAGE:
      return {
        ...state,
        storiesListPage: action.payload,
        currentStory: {}
      }
    case storyActions.READ_STORY:
      return {
        ...state,
        currentStory: action.payload
      }
    case storyActions.GET_USER_STORIES:
      return {
        ...state,
        userStories: action.payload
      }
    case storyActions.RESET_CURRENT_STORY:
      return {
        ...state,
        currentStory: undefined
      }
    default:
      return state;
  }
}

export default storiesReducer;
