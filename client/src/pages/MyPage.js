import React, { useState } from 'react';
import useFilter from '../hooks/useFilter';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListSquares, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import classes from './MyPage.module.scss';

const MyPage = () => {
  const currentYearAndMonth =
    new Date().getFullYear().toString() +
    '-' +
    ('0' + (new Date().getMonth() + 1).toString()).slice(-2);

  const { monthlyTotalSpending } = useFilter(currentYearAndMonth);

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
      <div className="spacer-sm" />
    </div>
  );
};

export default MyPage;
