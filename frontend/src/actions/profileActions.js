import axios from "axios";
import { profileActions } from "./types";

/* get profile data of the user with the given pk
 */
export const getProfile = pk => dispatch => {
  axios.get(`/api/profile/${pk}`).then(res => {
    dispatch({
      type: profileActions.GET_PROFILE,
      payload: res.data
    });
  });
};

export const register = (email, password, firstName, lastName) => dispatch => {
  axios
    .post("/api/register", {
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName
    })
    .then(res => {
      console.log(res.data);
    });
};

/*
 Login user and redirect to the home page
*/
export const login = (email, password) => dispatch => {
  axios.post("/api/login", { email: email, password: password }).then(res => {
    if (res.data["pk"]) {
      dispatch({
        type: profileActions.LOGIN,
        payload: res.data["pk"]
      });
      window.location.href = "/";
    }
  });
};

/*
  Logout the user and redirect to home page
*/
export const logout = () => dispatch => {
  axios
    .get("/api/logout")
    .then(res => {
      dispatch({
        type: profileActions.LOGOUT
      });
      window.location.href = "/";
    })
    .catch(error => console.log(error));
};

/*
  Check if the user that use app is authenticated (session authentication)
*/
export const checkIfAuthenticated = () => dispatch => {
  axios
    .get("/api/is_authenticated")
    .then(res => {
      if (res.data["pk"]) {
        dispatch({
          type: profileActions.LOGIN,
          payload: res.data["pk"]
        });
      }
    })
    .catch(error => console.log(error));
};

/*
  Set photo type (profile or background) of the newest uploaded photo to server
*/
export const setUploadedPhotoType = type => {
  return {
    type: profileActions.SET_UPLOADED_PHOTOT_TYPE,
    payload: type
  };
};

/*
  Change user background photo and update the state
*/
export const changeBackgroundPhoto = (userPK, photoPK) => dispatch => {
  axios
    .post(`/api/profile/${userPK}/edit`, { background_photo: photoPK })
    .then(res => {
      dispatch({
        type: profileActions.GET_PROFILE,
        payload: res.data
      });
    });
};

/*
  Change user profile photo and update the state
*/
export const changeProfilePhoto = (userPK, photoPK) => dispatch => {
  axios
    .post(`/api/profile/${userPK}/edit`, { profile_photo: photoPK })
    .then(res => {
      dispatch({
        type: profileActions.GET_PROFILE,
        payload: res.data
      });
    });
};
