export const LOGIN = "LOGIN";
export const loginAction = userState => {
  return {
    type: "LOGIN",
    payload: {
      isLoggedIn: true,
      uid: userState.uid,
      email: userState.email,
      password: userState.password,
    },
  };
};

export const SIGNUP = "SIGNUP";
export const signupAction = userState => {
  return {
    type: "SIGNUP",
    payload: {
      isLoggedIn: true,
      uid: userState.uid,
      username: userState.username,
      email: userState.email,
      password: userState.password,
    },
  };
};
