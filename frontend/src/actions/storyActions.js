import axios from "axios";
import { storyActions } from "./types";
import store from "../store";

export const getStories = () => dispatch => {
  axios.get("/api/stories").then(res => {
    updateStoriesListData(res.data, dispatch);
  });
};

export const getUserStories = profilePK => dispatch => {
  axios.get(`/api/stories/profile/${profilePK}`).then(res => {
    dispatch({
      type: storyActions.GET_USER_STORIES,
      payload: res.data
    });
  });
};

export const searchStories = keywords => dispatch => {
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
    });
  });
};

export const searchStoriesOnPage = (keywords, page) => dispatch => {
  axios.get(`/api/stories?search=${keywords}&page=${page}`).then(res => {
    updateStoriesListData(res.data, dispatch);
  });
};

export const addStory = data => dispatch => {
  let postData = {
    title: data.title,
    subtitle:data.subtitle,
    body: data.body,
    author: store.getState().profiles.user_pk,
    status:data.status
  };
  if (data.pk) {
    postData["pk"] = data.pk;
  }
  if (data.photo) {
    postData.featured_photo = data.photo;
  }
  axios
    .post("/api/story/add", postData)
    .then(res => {
      dispatch({
        type: storyActions.GET_NEW_STORY_STATUS,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const resetCurrentStory = () => {
  return {
    type: storyActions.RESET_CURRENT_STORY
  };
};

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
