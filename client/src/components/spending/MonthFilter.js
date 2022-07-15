import React from 'react';
import classes from './MonthFilter.module.scss';

const MonthFilter = ({ value, onChange }) => {
  return (
    <input
      className={classes.input}
      type="month"
      name="month"
      id="month"
      min="2021-01"
      value={value}
      onChange={onChange}
    />
  );
};

export default MonthFilter;
