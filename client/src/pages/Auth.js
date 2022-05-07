import React from "react";

import classes from "./Auth.module.scss";
import Button from "../components/UI/Button";

const Auth = () => {
  return (
    <div className={classes.auth}>
      <input
        type="checkbox"
        id="check"
        aria-hidden="true"
        className={classes.check}
      />

      <div className={classes.login}>
        <form className={classes["login-form"]}>
          <label
            htmlFor="check"
            aria-hidden="true"
            className={classes["login-label"]}
          >
            Welcome back
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={classes["login-input"]}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={classes["login-input"]}
          />
          <div className="spacer-md" />
          <Button>Log In</Button>
        </form>
      </div>

      <div className={classes.signup}>
        <form className={classes["signup-form"]}>
          <label
            htmlFor="check"
            aria-hidden="true"
            className={classes["signup-label"]}
          >
            Create an account
          </label>
          <input
            type="text"
            name="txt"
            placeholder="User name"
            className={classes["signup-input"]}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={classes["signup-input"]}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={classes["signup-input"]}
          />
          <div className="spacer-md" />
          <Button>Sign up</Button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
