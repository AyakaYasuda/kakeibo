import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useFilter = (filterValue) => {
  const spendingList = useSelector((state) => state.spending.spendingList);
  const [monthlyTotalSpending, setMonthlyTotalSpending] = useState();
  const [filteredSpendingList, setFilteredSpendingList] = useState([]);

  // filter spending data by month
  useEffect(() => {
    console.log(filterValue);
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

  return { filteredSpendingList, monthlyTotalSpending };
};

export default useFilter;
