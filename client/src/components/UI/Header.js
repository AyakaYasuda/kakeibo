import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducks/users/operations';

import Button from './Button';
import classes from './Header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.users);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className={classes.header}>
      <a href="/">kakeibo</a>
      {isLoggedIn && (
        <div className={classes.menu}>
          <a href="/my-page">My Page</a>
          <Button onClick={logoutHandler} size="small">
            LOGOUT
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
