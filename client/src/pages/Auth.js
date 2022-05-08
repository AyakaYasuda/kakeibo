import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Button from "../components/UI/Button";
import classNames from "classnames/bind";
import classes from "./Auth.module.scss";

const loginUserSchema = yup.object().shape({
  userEmail: yup.string().email().required(),
  userPassword: yup.string().min(6).required(),
});

const signupUserSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
});

let cx = classNames.bind(classes);

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const signupClass = cx({
    signup: true,
    "signup-show": !isLoginMode,
  });

  const {
    register: loginFromRegister,
    handleSubmit: loginFormHandleSubmit,
    reset: loginFormReset,
    formState: { errors: loginErrors },
  } = useForm({ resolver: yupResolver(loginUserSchema) });

  const {
    register: signupFromRegister,
    handleSubmit: signupFormHandleSubmit,
    reset: signupFormReset,
    formState: { errors: signupErrors },
  } = useForm({ resolver: yupResolver(signupUserSchema) });

  const switchModeHandler = () => {
    setIsLoginMode(prev => !prev);
  };

  const loginHandler = data => {
    console.log(data);
    loginFormReset();
  };

  const signupHandler = data => {
    console.log(data);
    signupFormReset();
  };

  return (
    <div className={classes.auth}>
      <div className={classes.login}>
        <h2 className={classes["login-title"]} onClick={switchModeHandler}>
          Welcome back
        </h2>
        {isLoginMode && (
          <form
            className={classes["login-form"]}
            onSubmit={loginFormHandleSubmit(loginHandler)}
          >
            <input
              type="email"
              name="userEmail"
              placeholder="Email"
              className={classes["login-input"]}
              {...loginFromRegister("userEmail")}
            />
            <input
              type="password"
              name="userPassword"
              placeholder="Password"
              className={classes["login-input"]}
              {...loginFromRegister("userPassword")}
            />
            <div className="spacer-md" />
            <Button>Log In</Button>
          </form>
        )}
      </div>

      <div className={signupClass}>
        <h2 className={classes["signup-title"]} onClick={switchModeHandler}>
          Create an account
        </h2>
        {!isLoginMode && (
          <form
            className={classes["signup-form"]}
            onSubmit={signupFormHandleSubmit(signupHandler)}
          >
            <input
              type="text"
              name="username"
              placeholder="User Name"
              className={classes["signup-input"]}
              {...signupFromRegister("username")}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={classes["signup-input"]}
              {...signupFromRegister("email")}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={classes["signup-input"]}
              {...signupFromRegister("password")}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              className={classes["signup-input"]}
              {...signupFromRegister("confirmPassword")}
            />
            <div className="spacer-md" />
            <Button>Sign Up</Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
