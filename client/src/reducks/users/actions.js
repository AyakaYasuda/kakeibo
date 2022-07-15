export const SIGNUP = 'SIGNUP';
export const signupAction = (user) => {
  return {
    type: 'SIGNUP',
    payload: user,
  };
};

export const LOGIN = 'LOGIN';
export const loginAction = (user) => {
  return {
    type: 'LOGIN',
    payload: user,
  };
};

export const LOGOUT = 'LOGOUT';
export const logoutAction = (user) => {
  return {
    type: 'LOGOUT',
    payload: user,
  };
};

export const ADD_BUDGET = 'ADD_BUDGET';
export const addBudgetAction = (budget) => {
  return {
    type: 'ADD_BUDGET',
    payload: { budget },
  };
};

export const FETCH_BUDGET = 'FETCH_BUDGET';
export const getBudgetByIdAction = (user) => {
  return {
    type: 'FETCH_BUDGET',
    payload: user,
  };
};

export const SET_ERROR = 'SET_ERROR';
export const setErrorAction = (error) => {
  return {
    type: 'SET_ERROR',
    payload: error,
  };
};

export const RESET_ERROR = 'RESET_ERROR';
export const resetErrorAction = (error) => {
  return {
    type: 'RESET_ERROR',
    payload: error,
  };
};
