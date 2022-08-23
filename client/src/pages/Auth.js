import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { signup, login } from '../reducks/users/operations';
import useUsersErrorModal from '../hooks/useUsersErrorModal';

import Button from '../components/UI/Button';
import classNames from 'classnames/bind';
import classes from './Auth.module.scss';
import ErrorModal from '../components/UI/ErrorModal';

const loginUserSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const signupUserSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
});

let cx = classNames.bind(classes);

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const dispatch = useDispatch();
  const { isModalShown, message, closeModalHandler } = useUsersErrorModal();

  const signupClass = cx({
    signup: true,
    'signup-show': !isLoginMode,
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
    setIsLoginMode((prev) => !prev);
  };

  const signupHandler = (data) => {
    const userState = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    dispatch(signup(userState));
    signupFormReset();
    setIsLoginMode(true);
  };

  const loginHandler = (data) => {
    const userState = {
      email: data.email,
      password: data.password,
    };
    dispatch(login(userState));
    loginFormReset();
  };

  return (
    <>
      {isModalShown && (
        <ErrorModal
          show={isModalShown}
          onClose={closeModalHandler}
          message={message}
        />
      )}
      {/* FIXME: split the code by creating form component */}
      <div className={classes.auth}>
        <div className={classes.login}>
          <h2 className={classes['login-title']} onClick={switchModeHandler}>
            Welcome back
          </h2>
          {isLoginMode && (
            <form
              className={classes['login-form']}
              onSubmit={loginFormHandleSubmit(loginHandler)}
            >
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={classes['login-input']}
                {...loginFromRegister('email')}
              />
              <p className={classes['login-error']}>
                {loginErrors.email?.message}
              </p>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={classes['login-input']}
                {...loginFromRegister('password')}
              />
              <p className={classes['login-error']}>
                {loginErrors.password?.message}
              </p>
              <div className="spacer-md" />
              <Button>Log In</Button>
            </form>
          )}
        </div>

        <div className={signupClass}>
          <h2 className={classes['signup-title']} onClick={switchModeHandler}>
            Create an account
          </h2>
          {!isLoginMode && (
            <form
              className={classes['signup-form']}
              onSubmit={signupFormHandleSubmit(signupHandler)}
            >
              <input
                type="text"
                name="username"
                placeholder="User Name"
                className={classes['signup-input']}
                {...signupFromRegister('username')}
              />
              <p className={classes['signup-error']}>
                {signupErrors.username?.message}
              </p>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={classes['signup-input']}
                {...signupFromRegister('email')}
              />
              <p className={classes['signup-error']}>
                {signupErrors.email?.message}
              </p>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={classes['signup-input']}
                {...signupFromRegister('password')}
              />
              <p className={classes['signup-error']}>
                {signupErrors.password?.message}
              </p>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                className={classes['signup-input']}
                {...signupFromRegister('confirmPassword')}
              />
              {signupErrors.confirmPassword?.message && (
                <p className={classes['signup-error']}>
                  confirm password must be the same as password above
                </p>
              )}
              <div className="spacer-md" />
              <Button>Sign Up</Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Auth;
