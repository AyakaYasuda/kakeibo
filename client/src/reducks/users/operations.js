import axios from "axios";
import { signupAction, loginAction } from "./actions";

export const signup = userState => {
  return async dispatch => {
    await axios
      .post(`${process.env.REACT_APP_BACKEND_API}/users/signup`, userState)
      .then(response => {
        console.log(response.data);
        dispatch(
          signupAction({
            isLoggedIn: true,
            uid: response.data.userId,
            username: response.data.username,
            email: response.data.email,
            password: response.data.password,
            token: response.data.token,
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
            uid: response.data.userId,
            username: response.data.username,
            email: response.data.email,
            password: response.data.password,
            token: response.data.token,
          })
        );
      });
  };
};
