import axios from "axios";
import { profileActions } from "./types";
import { loginStatus, registerStatus } from "../messages";

/* 
Get profile data of the user with the given pk.
 */
export const getProfile = pk => dispatch => {
  axios.get(`/api/profile/${pk}`).then(res => {
    dispatch({
      type: profileActions.GET_PROFILE,
      payload: res.data
    });
  });
};

/*
Register new user.
*/
export const register = (email, password, firstName, lastName) => dispatch => {
  axios
    .post("/api/register", {
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName
    })
    .then(res => {
      const status = res.data.status;
      let message;
      switch (status) {
        case 0:
          message = registerStatus.ALREADY_EXIST;
          break;
        case 1:
          message = registerStatus.SUCCESS;
          break;
      }
      dispatch({
        type: profileActions.REGISTER,
        payload: message
      });
    })
    .catch(error => {
      dispatch({
        type: profileActions.REGISTER,
        payload: "An error accured"
      });
    });
};

/*
 Login user and redirect to the home page.
*/
export const login = (email, password) => dispatch => {
  axios
    .post("/api/login", { email: email, password: password })
    .then(res => {
      switch (res.data["status"]) {
        case 1: // success
          dispatch({
            type: profileActions.LOGIN,
            payload: res.data["pk"]
          });
          window.location.href = "/";
        case 2: // account email not verified
          dispatch({
            type: profileActions.LOGIN_FAILED,
            payload: loginStatus.INCORRECT_DATA
          });
        case 3: // incorrect email or password
          dispatch({
            type: profileActions.LOGIN_FAILED,
            payload: loginStatus.INCORRECT_DATA
          });
      }
    })
    .catch(error => {
      // some error with connection occured
      dispatch({
        type: profileActions.LOGIN_FAILED,
        payload: loginStatus.ERROR
      });
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

/*
Clear all messages about login or register status
*/
export const resetLoginStatusMessages = () => {
  return {
    type: profileActions.RESET_LOGIN_MESSAGES
  };
};
