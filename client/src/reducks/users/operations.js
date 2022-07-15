import axios from 'axios';
import {
  signupAction,
  loginAction,
  logoutAction,
  addBudgetAction,
  getBudgetByIdAction,
  setErrorAction,
  resetErrorAction,
} from './actions';

export const signup = (userState) => {
  return async (dispatch) => {
    await axios
      .post(`${process.env.REACT_APP_BACKEND_API}/users/signup`, userState)
      .then((response) => {
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
      .catch((err) => {
        const { message } = err.response.data;
        dispatch(
          setErrorAction({
            status: err.response.status,
            message: message,
          })
        );
      });
  };
};

export const login = (userState, expirationDate) => {
  return async (dispatch) => {
    await axios
      .post(`${process.env.REACT_APP_BACKEND_API}/users/login`, userState)
      .then((response) => {
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

        const tokenExpirationDate =
          expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

        localStorage.setItem(
          'userData',
          JSON.stringify({
            uid: response.data.userId,
            token: response.data.token,
            expiration: tokenExpirationDate.toISOString(),
          })
        );
      })
      .catch((err) => {
        const { message } = err.response.data;
        dispatch(
          setErrorAction({
            status: err.response.status,
            message: message,
          })
        );
      });
  };
};

export const autoLogin = (userId, token, expirationDate) => {
  return async (dispatch) => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_API}/users/${userId}`)
      .then((response) => {
        const { username, email, password } = response.data.user;
        dispatch(
          loginAction(
            {
              isLoggedIn: true,
              uid: userId,
              username: username,
              email: email,
              password: password,
              token: token,
            },
            expirationDate
          )
        );
      })
      .catch((err) => {
        const { message } = err.response.data;
        dispatch(
          setErrorAction({
            status: err.response.status,
            message: message,
          })
        );
      });
  };
};

export const logout = () => {
  return async (dispatch) => {
    localStorage.removeItem('userData');
    dispatch(
      logoutAction({
        isLoggedIn: false,
        uid: null,
        username: null,
        email: null,
        password: null,
        token: null,
        budget: null,
      })
    );
  };
};

export const addBudget = (userId, token, budget) => {
  return async (dispatch) => {
    await axios
      .patch(`${process.env.REACT_APP_BACKEND_API}/users/${userId}`, budget, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(addBudgetAction(response.data.budget));
      })
      .catch((err) => {
        const { message } = err.response.data;
        dispatch(
          setErrorAction({
            status: err.response.status,
            message: message,
          })
        );
      });
  };
};

export const getBudgetById = (userId) => {
  return async (dispatch) => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_API}/users/${userId}`)
      .then((response) => {
        const { budget } = response.data.user;
        dispatch(getBudgetByIdAction({ budget: budget }));
      })
      .catch((err) => {
        const { message } = err.response.data;
        dispatch(
          setErrorAction({
            status: err.response.status,
            message: message,
          })
        );
      });
  };
};

export const resetError = () => {
  return async (dispatch) => {
    dispatch(
      resetErrorAction({
        status: null,
        message: '',
      })
    );
  };
};
