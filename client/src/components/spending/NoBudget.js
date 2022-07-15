import React from 'react';

import Button from '../UI/Button';
import Wink from '../../assets/images/wink.png';
import classes from './NoBudget.module.scss';

const NoBudget = () => {
  return (
    <div className={classes.container}>
      <img src={Wink} alt="wink" />
      <div className={classes.message}>
        <h2>Set your personal monthly budget</h2>
        <Button size="small" to="/settings">
          Go to settings
        </Button>
      </div>
    </div>
  );
};

export default NoBudget;
