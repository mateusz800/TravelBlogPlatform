import axios from "axios";
import { storyActions } from "./types";

export const getArticles = () => dispatch => {
  axios.get("/api/stories").then(res => {
    updateStoriesListData(res.data, dispatch);
  });
};

export const searchArticles = keywords => dispatch => {
  axios.get(`/api/stories?search=${keywords}`).then(res => {
    updateStoriesListData(res.data, dispatch);
  });
};

export const changePage = page => dispatch => {
  axios.get(`/api/stories?page=${page}`).then(res => {
    updateStoriesListData(res.data, dispatch);
    
    dispatch({
      type: storyActions.CHANGE_LIST_PAGE,
      payload: page
    });
  });
};

export const getStory = pk => dispatch => {
  axios.get(`/api/story/${pk}`).then(res => {
    dispatch({
      type: storyActions.READ_STORY,
      payload: res.data
    })
  })
}

export const searchArticlesOnPage = (keywords, page) => dispatch => {
  axios.get(`/api/stories?search=${keywords}&page=${page}`).then(res => {
    updateStoriesListData(res.data, dispatch);
  });
}

function updateStoriesListData(data, dispatch) {
  dispatch({
    type: storyActions.GET_STORY,
    payload: data.results
  });
  dispatch({
    type: storyActions.GET_STORY_COUNT,
    payload: data.count
  });
}
