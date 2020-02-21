import axios from "axios";
import { profileActions } from "./types";

export const getProfile = pk => dispatch => {
  axios.get(`/api/profile/${pk}`).then(res => {
    dispatch({
      type: profileActions.GET_PROFILE,
      payload: res.data
    });
  });
};
