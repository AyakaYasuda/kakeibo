import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducks/users/operations';

import Button from './Button';
import classes from './Header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
  console.log('isLoggedIn', isLoggedIn);

  const logoutHandler = () => {
    console.log('logout');
    dispatch(logout());
  };

  return (
    <div className={classes.header}>
      <a href="/">kakeibo</a>
      {isLoggedIn && (
        <Button onClick={logoutHandler} size="small">
          LOGOUT
        </Button>
      )}
    </div>
  );
};

export default Header;
