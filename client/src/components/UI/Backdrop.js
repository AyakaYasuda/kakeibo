import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Backdrop.module.scss';

const Backdrop = ({ onClick }) => {
  const content = <div className={classes.backdrop} onClick={onClick}></div>;

  return ReactDOM.createPortal(
    content,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
