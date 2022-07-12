import React from 'react';

const MonthFilter = ({ value, onChange }) => {
  return (
    <>
      <label htmlFor="month">Select month</label>
      <input
        type="month"
        name="month"
        id="month"
        min="2021-01"
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default MonthFilter;
