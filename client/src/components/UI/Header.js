import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../reducks/users/operations';

import Button from './Button';
import classes from './Header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
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
