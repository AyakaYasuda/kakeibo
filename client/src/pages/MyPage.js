import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListSquares, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import classes from './MyPage.module.scss';

const MyPage = () => {
  return (
    <div className="section-container center-col">
      <div>
        <FontAwesomeIcon
          icon={faListSquares}
          className={classes['icon-list']}
        />
        <Link to="/spending">Monthly Spending List</Link>
      </div>
      <div className="spacer-sm" />
      <div>
        <FontAwesomeIcon icon={faCirclePlus} className={classes['icon-add']} />
        <Link to="/spending/new">Create Spending</Link>
      </div>
    </div>
  );
};

export default MyPage;
