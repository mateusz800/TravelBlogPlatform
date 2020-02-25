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

export const register = (email, password) => dispatch => {
  axios
    .post("/api/register", { email: email, password: password })
    .then(res => {
      console.log(res.data);
    });
};

export const login = (email, password) => dispatch => {
  axios.post("/api/login", { email: email, password: password }).then(res => {
    if (res.data["pk"]) {
      dispatch({
        type: profileActions.LOGIN,
        payload: res.data["pk"]
      });
    }
  });
};

export const logout = () => dispatch => {
  console.log("logout");
  axios
    .get("/api/logout")
    .then(res => {
      
      dispatch({
        type: profileActions.LOGOUT
      });
    })
    .catch(error => console.log(error));
};

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
