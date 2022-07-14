import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSpendingByUserId } from '../reducks/spending/operations';

const useFilter = (filterValue) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.users.uid);
  const spendingList = useSelector((state) => state.spending.spendingList);
  const [monthlyTotalSpending, setMonthlyTotalSpending] = useState();
  const [filteredSpendingList, setFilteredSpendingList] = useState([]);
  console.log('spendingList', spendingList);

  useEffect(() => {
    if (userId) {
      console.log('run');
      dispatch(getSpendingByUserId(userId));
    }
  }, [dispatch, userId]);

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

  console.log(filteredSpendingList, monthlyTotalSpending);

  return { filteredSpendingList, monthlyTotalSpending };
};

export default useFilter;
