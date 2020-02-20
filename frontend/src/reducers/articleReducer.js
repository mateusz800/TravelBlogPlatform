import { articleActions } from "../actions/types";

const initialState = {
  articles: []
};

function articleReducer(state = initialState, action) {
  switch (action.type) {
    case articleActions.GET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
        currentArticle: {}
      };
    case articleActions.GET_ARTICLES_COUNT:
      return {
        ...state,
        articlesCount: action.payload
      };
    case articleActions.CHANGE_LIST_PAGE:
      return {
        ...state,
        articleListPage: action.payload,
        currentArticle: {}
      }
    case articleActions.READ_ARTICLE:
      return {
        ...state,
        currentArticle: action.payload
      }
    default:
      return state;
  }
}

export default articleReducer;
