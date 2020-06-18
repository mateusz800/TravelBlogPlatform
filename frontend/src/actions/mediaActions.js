import axios from "axios";
import { mediaActions } from "./types";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export const uploadPhoto =  (photo, type, userPK) => dispatch => {
  const data = new FormData();
  data.append("source", photo);
  data.append("author", userPK);
  axios.post("/api/media/photo/upload", data).then(res => {
    /*
    dispatch({
      type: mediaActions.ADD_NEW_PHOTO,
      payload: res.data,
      photoType: type
    });
    */
    setPhotoType(res.data.source, type)
  })
};

export async function uploadPhotoFn(photo, userPK){
  const data = new FormData();
  data.append("source", photo);
  data.append("author", userPK)
  const result = await axios.post("/api/media/photo/upload", data);
  return result.data;
}
export const setPhotoType = (photoUrl, type) => dispatch =>{
  console.log("ok");
  console.log(type);
  dispatch({
    type:mediaActions.ADD_NEW_PHOTO,
    payload:{source:photoUrl},
    photoType:type
  })
}


/*
get all photos of the given user
*/
export const getUserMedia = (userPK) => dispatch =>{
  axios.get(`/api/media/user/${userPK}`).then(res => {
    console.log(res);
    dispatch({
      type: mediaActions.GET_USER_MEDIA,
      payload: res.data,
    });
  })
}