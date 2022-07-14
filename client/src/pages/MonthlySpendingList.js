import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import useFilter from '../hooks/useFilter';

import MonthFilter from '../components/spending/MonthFilter';
import SpendingCard from '../components/spending/SpendingCard';
import Button from '../components/UI/Button';
import classes from './MonthlySpendingList.module.scss';

const MonthlySpendingList = () => {
  const initValue = `${new Date().getFullYear().toString()}-${(
    '0' + (new Date().getMonth() + 1).toString()
  ).slice(-2)}`;
  const spendingList = useSelector((state) => state.spending.spendingList);
  const [filterValue, setFilterValue] = useState(initValue);

  const { filteredSpendingList, monthlyTotalSpending } = useFilter(filterValue);

  if (!spendingList || spendingList.length === 0) {
    return (
      <div className="section-container center-col">
        <p>No spending yet... Create new spending?</p>
        <div className="spacer-sm" />
        <Button to="/spending/new">Create</Button>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      {monthlyTotalSpending && (
        <div>Total Spending : ${monthlyTotalSpending.toFixed(2)}</div>
      )}
      <MonthFilter
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
      />
      {filteredSpendingList.length > 0 &&
        filteredSpendingList.map((spending) => (
          <SpendingCard data={spending} key={spending.id} />
        ))}
    </div>
  );
};

export default MonthlySpendingList;
