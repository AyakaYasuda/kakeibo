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
