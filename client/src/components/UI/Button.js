import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import classes from "./Button.module.scss";

let cx = classNames.bind(classes);

const Button = props => {
  const btnClass = cx({
    btn: true,
    "btn-sm": props.size === "small",
    "btn-lg": props.size === "large",
  });

  if (props.href) {
    return (
      <a className={btnClass} href={props.href}>
        {props.children}
      </a>
    );
  }

  if (props.to) {
    return (
      <Link to={props.to} exact={props.exact} className={btnClass}>
        {props.children}
      </Link>
    );
  }
  
  return (
    <button
      className={btnClass}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
