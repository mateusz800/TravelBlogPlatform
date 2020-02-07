import axios from "axios";
import { articleActions } from "./types";


export const getArticles = () => dispatch => {
  axios.get("/api/articles").then(res => {
    dispatch({
      type: articleActions.GET_ARTICLES,
      payload: res.data 
  })});
};
 