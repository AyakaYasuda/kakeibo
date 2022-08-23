import React from 'react';

import Button from '../UI/Button';
import Shocked from '../../assets/images/shocked.png';
import classes from './NoSpending.module.scss';

const NoSpending = () => {
  return (
    <div className={classes.container}>
      <img src={Shocked} alt="shocked" />
      <div className={classes.message}>
        <h2>No spending recorded yet this month!</h2>
        <Button size="small" to="/spending/new">
          Record Spending
        </Button>
        <Button size="small" to="/spending">
          Spending History
        </Button>
      </div>
    </div>
  );
};

export default NoSpending;
