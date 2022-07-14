import React from 'react';
import useFilter from '../hooks/useFilter';

import categories from '../util/categories';
import PieChart from '../components/charts/PieChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListSquares, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import classes from './MyPage.module.scss';

const MyPage = () => {
  const currentYearAndMonth =
    new Date().getFullYear().toString() +
    '-' +
    ('0' + (new Date().getMonth() + 1).toString()).slice(-2);

  const { filteredSpendingList, monthlyTotalSpending } =
    useFilter(currentYearAndMonth);

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

    // 3. create data tailored to chart
    return categories
      .map((category) => ({
        x: category,
        y: spendingAmountArr[categoryMap.get(category)],
      }))
      .filter((item) => item.y !== 0);
  };

  return (
    <div className="section-container center-col">
      <div>
        <FontAwesomeIcon icon={faCirclePlus} className={classes['icon-add']} />
        <Link to="/spending/new">Create Spending</Link>
      </div>
      <p>${monthlyTotalSpending}</p>
      <div>
        <FontAwesomeIcon
          icon={faListSquares}
          className={classes['icon-list']}
        />
        <Link to="/spending">Monthly Spending List</Link>
      </div>
      <PieChart data={createChartData()} />
      <div className="spacer-sm" />
    </div>
  );
};

export default MyPage;
