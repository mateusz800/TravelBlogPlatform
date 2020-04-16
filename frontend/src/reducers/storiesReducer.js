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
    case storyActions.GET_FEATURED_STORIES:
      return {
        ...state,
        featuredStories: action.payload
      };
    case storyActions.GET_SIMILAR_STORIES:
      return {
        ...state,
        similarStories: action.payload
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
      };
    case storyActions.READ_STORY:
      return {
        ...state,
        currentStory: action.payload
      };
    case storyActions.GET_USER_STORIES:
      return {
        ...state,
        userStories: action.payload
      };
    case storyActions.GET_USER_DRAFT_STORIES:
      console.log("jest ok");
      return {
        ...state,
        userDrafts: action.payload
      };
    case storyActions.RESET_CURRENT_STORY:
      return {
        ...state,
        currentStory: undefined
      };
    case storyActions.ADD_TAG:
      const currentStory = state.currentStory;
      if (!currentStory.tags.includes(action.payload)){
        currentStory.tags.push(action.payload);
      }
      return {
        ...state,
        currentStory: currentStory
      };
    case storyActions.REMOVE_TAG:
      const story = state.currentStory;
      const index = story.tags.indexOf(action.payload);
      story.tags.splice(index, 1);
      return {
        ...state,
        currentStory: story
      };
    default:
      return state;
  }
}

export default storiesReducer;
