import React from 'react';
import { Bars } from 'react-loader-spinner';
import classes from './LoadingSpinner.module.scss';

const LoadingSpinner = () => {
  return (
    <div className={classes.container}>
      <Bars
        height="100"
        width="100"
        ariaLabel="loading-indicator"
        color="#0081a7"
      />
    </div>
  );
};

export default LoadingSpinner;
