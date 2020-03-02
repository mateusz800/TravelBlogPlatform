import axios from "axios";
import { mediaActions } from "./types";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export const uploadPhoto =  (photo, type) => dispatch => {
  const data = new FormData();
  data.append("source", photo);
  console.log("ok");
  axios.post("/api/media/photo/upload", data).then(res => {
    dispatch({
      type: mediaActions.ADD_NEW_PHOTO,
      payload: res.data,
      photoType: type
    });
  })
};

export async function uploadPhotoFn(photo){
  const data = new FormData();
  data.append("source", photo);
  const result = await axios.post("/api/media/photo/upload", data);
  return result.data;
}