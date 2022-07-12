import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getSpendingByUserId } from '../reducks/spending/operations';

import MonthFilter from '../components/spending/MonthFilter';
import SpendingCard from '../components/spending/SpendingCard';
import Button from '../components/UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import classes from './MonthlySpendingList.module.scss';

const MonthlySpendingList = () => {
  const dispatch = useDispatch();
  const [monthlyTotalSpending, setMonthlyTotalSpending] = useState();
  const [currentYear, setCurrentYear] = useState('');
  const [currentMonth, setCurrentMonth] = useState('');
  const [filterValue, setFilterValue] = useState(
    `${new Date().getFullYear().toString()}-${(
      0 + new Date().getMonth().toString()
    ).slice(-2)}`
  );
  const [filteredSpendingList, setFilteredSpendingList] = useState([]);
  const userId = useSelector((state) => state.users.uid);
  const spendingList = useSelector((state) => state.spending.spendingList);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    setCurrentMonth(new Date().getMonth());
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(getSpendingByUserId(userId));
    }
  }, [userId, dispatch]);

  // filter spending data by month
  useEffect(() => {
    if (spendingList && spendingList.length !== 0) {
      const selectedYear = filterValue.slice(0, 4);
      const selectedMonth = filterValue.slice(-2);

      setFilteredSpendingList(
        spendingList.filter((spending) => {
          return (
            new Date(spending.createdAt).getFullYear() ===
              Number(selectedYear) &&
            new Date(spending.createdAt).getMonth() + 1 ===
              Number(selectedMonth)
          );
        })
      );
    }
  }, [spendingList, filterValue]);

  // get monthly total amount
  useEffect(() => {
    if (filteredSpendingList && filteredSpendingList.length !== 0) {
      const monthlyTotalAmount = filteredSpendingList
        .map((spending) => spending.amount)
        .reduce((prev, curr) => prev + curr, 0);

      setMonthlyTotalSpending(monthlyTotalAmount);
    }
  }, [filteredSpendingList]);

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
