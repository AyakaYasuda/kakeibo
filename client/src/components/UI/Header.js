import React from 'react';
import { Link } from 'react-router-dom';
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
    <section className={classes.header}>
      <div className={classes["header-container"]}>
        <Link to="/">kakeibo</Link>
        {isLoggedIn && (
          <div className={classes.menu}>
            <Link to="/my-page">My page</Link>
            <Link to="/settings">Settings</Link>
            <Button onClick={logoutHandler} size="small">
              LOGOUT
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Header;
