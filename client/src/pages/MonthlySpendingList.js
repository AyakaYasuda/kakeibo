import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import useFilter from '../hooks/useFilter';

import NoSpending from '../components/spending/NoSpending';
import MonthFilter from '../components/spending/MonthFilter';
import SpendingCard from '../components/spending/SpendingCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import classes from './MonthlySpendingList.module.scss';

const MonthlySpendingList = () => {
  const initValue = `${new Date().getFullYear().toString()}-${(
    '0' + (new Date().getMonth() + 1).toString()
  ).slice(-2)}`;
  const spendingList = useSelector((state) => state.spending.spendingList);
  const [filterValue, setFilterValue] = useState(initValue);

  const { filteredSpendingList, monthlyTotalSpending } = useFilter(filterValue);

  if (!spendingList) {
    return <LoadingSpinner />;
  }

  return (
    <div className={classes['container']}>
      <div className={classes['total-spending']}>
        <h2>Total Spending as of {filterValue} </h2>
        <h1>${Number(monthlyTotalSpending?.toFixed(2)).toLocaleString()}</h1>
      </div>

      <MonthFilter
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
      />
      <div className={classes['spending-list']}>
        {filteredSpendingList.length > 0 ? (
          filteredSpendingList.map((spending) => (
            <SpendingCard data={spending} key={spending.id} />
          ))
        ) : (
          <NoSpending />
        )}
      </div>
    </div>
  );
};

export default MonthlySpendingList;
