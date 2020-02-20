import axios from "axios";
import { articleActions } from "./types";

export const getArticles = () => dispatch => {
  axios.get("/api/articles").then(res => {
    updateArticleListData(res.data, dispatch);
  });
};

export const searchArticles = keywords => dispatch => {
  axios.get(`/api/articles?search=${keywords}`).then(res => {
    updateArticleListData(res.data, dispatch);
  });
};

export const changePage = page => dispatch => {
  axios.get(`/api/articles?page=${page}`).then(res => {
    updateArticleListData(res.data, dispatch);
    dispatch({
      type: articleActions.CHANGE_LIST_PAGE,
      payload: page
    });
  });
};

export const getArticle = pk => dispatch => {
  axios.get(`/api/article/${pk}`).then(res => {
    dispatch({
      type: articleActions.READ_ARTICLE,
      payload: res.data
    })
  })
}

function updateArticleListData(data, dispatch) {
  dispatch({
    type: articleActions.GET_ARTICLES,
    payload: data.results
  });
  dispatch({
    type: articleActions.GET_ARTICLES_COUNT,
    payload: data.count
  });
}
