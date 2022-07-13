import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getSpendingByUserId } from '../reducks/spending/operations';
import useFilter from '../hooks/useFilter';

import MonthFilter from '../components/spending/MonthFilter';
import SpendingCard from '../components/spending/SpendingCard';
import Button from '../components/UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import classes from './MonthlySpendingList.module.scss';

const MonthlySpendingList = () => {
  const dispatch = useDispatch();
  const initialDate = `${new Date().getFullYear().toString()}-${(
    '0' + (new Date().getMonth() + 1).toString()
  ).slice(-2)}`;

  const userId = useSelector((state) => state.users.uid);
  const spendingList = useSelector((state) => state.spending.spendingList);
  const [filterValue, setFilterValue] = useState(initialDate);

  const { filteredSpendingList, monthlyTotalSpending } = useFilter(filterValue);

  useEffect(() => {
    if (userId) {
      dispatch(getSpendingByUserId(userId));
    }
  }, [dispatch]);

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
      <Link to={'/spending/new'}>
        <FontAwesomeIcon className={classes['add-btn']} icon={faCirclePlus} />
      </Link>
    </div>
  );
};

export default MonthlySpendingList;
