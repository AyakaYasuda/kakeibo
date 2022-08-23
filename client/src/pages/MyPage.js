import React, { useEffect, Suspense } from 'react';
import useFilter from '../hooks/useFilter';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBudgetById } from '../reducks/users/operations';

import categories from '../util/categories';
import PieChart from '../components/charts/PieChart';
import Status from '../components/spending/Status';
// import NoSpending from '../components/spending/NoSpending';
// import NoBudget from '../components/spending/NoBudget';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListSquares, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import classes from './MyPage.module.scss';

const NoSpending = React.lazy(() =>
  import('../components/spending/NoSpending')
);
const NoBudget = React.lazy(() => import('../components/spending/NoBudget'));

const MyPage = () => {
  const dispatch = useDispatch();
  const { uid, budget } = useSelector((state) => state.users);
  const currentYearAndMonth =
    new Date().getFullYear().toString() +
    '-' +
    ('0' + (new Date().getMonth() + 1).toString()).slice(-2);

  const { filteredSpendingList, monthlyTotalSpending } =
    useFilter(currentYearAndMonth);

  useEffect(() => {
    if (uid) {
      dispatch(getBudgetById(uid));
    }
  }, [uid, dispatch]);

  const createChartData = () => {
    // 1. create category map from categories
    const categoryMap = new Map();
    categories.map((category, index) => categoryMap.set(category, index));

    // 2. create an array of spending amount
    const spendingAmountArr = new Array(categories.length).fill(0);
    for (const spending of filteredSpendingList) {
      const idx = categoryMap.get(spending.category);
      spendingAmountArr[idx] += spending.amount;
    }

    // 3. create data tailored to chart, then return it
    return categories
      .map((category) => ({
        x: category,
        y: spendingAmountArr[categoryMap.get(category)],
      }))
      .filter((item) => item.y !== 0);
  };

  let content;

  if (!monthlyTotalSpending || filteredSpendingList.length === 0) {
    content = <LoadingSpinner />;
  }

  if (filteredSpendingList.length === 0) {
    content = (
      <>
        {!budget && <NoBudget />}
        <NoSpending />
      </>
    );
  }

  if (filteredSpendingList.length !== 0) {
    content = (
      <>
        {!budget && <NoBudget />}
        <div className={classes['container']}>
          <section>
            <div className={classes.menu}>
              <div className={classes['menu-item']}>
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  className={classes['icon']}
                />
                <Link to="/spending/new">Record Spending</Link>
              </div>
              <div className={classes['menu-item']}>
                <FontAwesomeIcon
                  icon={faListSquares}
                  className={classes['icon']}
                />
                <Link to="/spending">Spending History</Link>
              </div>
            </div>
            <div className={classes.status}>
              <h1>
                ${Number(monthlyTotalSpending?.toFixed(2)).toLocaleString()}{' '}
                spent so far
              </h1>
              <Status />
            </div>
          </section>
          <div className={classes.chart}>
            <h2>Your Spending By Category</h2>
            <h3>Click and check the amount spent on each category</h3>
            <PieChart data={createChartData()} />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className={classes['wrapper']}>
      <Suspense fallback={<LoadingSpinner />}>{content}</Suspense>
    </div>
  );
};

export default MyPage;
