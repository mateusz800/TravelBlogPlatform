import axios from "axios";
import { storyActions } from "./types";
import store from "../store";

export const getStories = () => dispatch => {
  axios.get("/api/stories").then(res => {
    updateStoriesListData(res.data, dispatch);
  });
};

export const getFeaturedStories = (count) => dispatch => {
  axios.get(`/api/stories?count=${count}`).then(res => {
    dispatch({
      type:storyActions.GET_FEATURED_STORIES,
      payload: res.data.results
    })
  });
};

export const getPopularStories = (count) => dispatch => {
  axios.get(`/api/stories/popular/${count}`).then(res => {
    dispatch({
      type:storyActions.GET_POPULAR_STORIES,
      payload: res.data.stories
    })
  });
}

export const getUserStories = profilePK => dispatch => {
  axios.get(`/api/stories/profile/${profilePK}`).then(res => {
    dispatch({
      type: storyActions.GET_USER_STORIES,
      payload: res.data.stories
    });
  });
};

/* get similar stories to the given one */
export const getSimilarStories = storyPK => dispatch => {
  axios.get(`/api/story/${storyPK}/similar_stories`).then(res => {
    dispatch({
      type: storyActions.GET_SIMILAR_STORIES,
      payload: res.data
    });
  });
};

export const getUserDraftStories = profilePK => dispatch => {
  axios.get(`/api/stories/profile/${profilePK}/drafts/1`).then(res => {
    dispatch({
      type: storyActions.GET_USER_DRAFT_STORIES,
      payload: res.data.stories
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
    author: [store.getState().profiles.user_pk],
    status:data.status
  };
  if (data.pk ) {
    postData["pk"] = data.pk;
  }
  if (data.photo ) {
    postData.featured_photo = data.photo;
  }

  axios
    .post("/api/story/add", postData)
    .then(res => {
      dispatch({
        type: storyActions.GET_NEW_STORY_STATUS,
        payload: res.data
      });
      window.location.href = `/story/${res.data['pk']}`
    })
    .catch(error => {
      console.log(error);
    });
};

/* Add tag to the story */
export const addTag = (story_pk, tag) => dispatch => {
  axios.get(`/api/story/${story_pk}/add_tag/${tag}`).then(res => {
      /* Update tag list */
      dispatch({
        type:storyActions.ADD_TAG,
        payload: tag
      });
  });
}

/* Remove tag from the story */
export const removeTag = (story_pk, tag) => dispatch => {
  axios.get(`/api/story/${story_pk}/remove_tag/${tag}`).then(res => {
      /* Update tag list */
      dispatch({
        type:storyActions.REMOVE_TAG,
        payload: tag
      });
  });
}

/* remove story from database */
export const removeStory = pk => dispatch => {
  console.log('remove');
  axios.get(`/api/story/${pk}/remove`).then(res => {
      // Story removed. Go back.
      window.history.back();
  });
}

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
