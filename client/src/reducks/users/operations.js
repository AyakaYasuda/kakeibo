import axios from "axios";
import { signupAction, loginAction } from "./actions";

export const signup = userState => {
  return async dispatch => {
    await axios
      .post(`${process.env.REACT_APP_BACKEND_API}/users/signup`, userState)
      .then(response => {
        dispatch(
          signupAction({
            isLoggedIn: true,
            username: response.data.user.username,
            email: response.data.user.email,
            password: response.data.user.password,
          })
        );
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const login = userState => {
  return async dispatch => {
    await axios
      .post(`${process.env.REACT_APP_BACKEND_API}/users/login`, userState)
      .then(response => {
        dispatch(
          loginAction({
            isLoggedIn: true,
            uid: response.data.uid,
            username: response.data.username,
            email: response.data.email,
            password: response.data.password,
          })
        );
      });
  };
};
