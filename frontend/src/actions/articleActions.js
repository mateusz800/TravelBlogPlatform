import axios from "axios";
import { articleActions } from "./types";

export const getArticles = () => dispatch => {
  axios.get("/api/articles").then(res => {
    dispatch({
      type: articleActions.GET_ARTICLES,
      payload: res.data
    });
  });
};

export const searchArticles = keywords => dispatch => {
  axios.get(`/api/articles?search=${keywords}`).then(res => {
    dispatch({
      type: articleActions.SEARCH_ARTCILES,
      payload: res.data
    });
  });
};
