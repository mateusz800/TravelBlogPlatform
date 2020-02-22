import axios from "axios";
import { mediaActions } from "./types";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export const uploadPhoto = photo => dispatch => {
  const data = new FormData();
  data.append("source", photo);
  axios.post("/api/media/photo/upload", data).then(res => {
    dispatch({
      type: mediaActions.ADD_NEW_PHOTO,
      payload: res.data
    });
  });
};
