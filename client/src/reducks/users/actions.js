export const SIGNUP = "SIGNUP";
export const signupAction = user => {
  return {
    type: "SIGNUP",
    payload: user,
  };
};

export const LOGIN = "LOGIN";
export const loginAction = user => {
  return {
    type: "LOGIN",
    payload: user,
  };
};
