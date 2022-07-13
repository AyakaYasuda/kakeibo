import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { autoLogin, logout } from './reducks/users/operations';

import MyPage from './pages/MyPage';
import Auth from './pages/Auth';
import MonthlySpendingList from './pages/MonthlySpendingList';
import NewSpending from './pages/NewSpending';
import SpendingEdit from './pages/SpendingEdit';

const Router = () => {
  const dispatch = useDispatch();
  const [storedData, setStoredData] = useState();
  const token = storedData?.token;
  const userId = storedData?.uid;
  const expiration = storedData?.expiration;

  const { isLoggedIn } = useSelector((state) => state.users);

  useEffect(() => {
    setStoredData(JSON.parse(localStorage.getItem('userData')));
  }, [isLoggedIn]);

  // auto login
  useEffect(() => {
    if (token && new Date(expiration) > new Date()) {
      dispatch(autoLogin(userId, token, new Date(expiration)));
    }
  }, [token, expiration, userId, dispatch]);

  // auto logout
  useEffect(() => {
    let logoutTimer;
    if ((token, expiration)) {
      const remainingTime = new Date(expiration) - new Date().getTime();

      logoutTimer = setTimeout(() => dispatch(logout()), remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, expiration, dispatch]);

  let routes;
  if (token) {
    routes = (
      <>
        <Route exact path="/my-page" element={<MyPage />} />
        <Route exact path="/spending/new" element={<NewSpending />} />
        <Route exact path="/spending/edit/:id" element={<SpendingEdit />} />
        <Route exact path="/spending" element={<MonthlySpendingList />} />
        <Route exact path="*" element={<Navigate to="/my-page" replace />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route exact path="/auth" element={<Auth />} />
        <Route exact path="*" element={<Navigate to="/auth" replace />} />
      </>
    );
  }

  return <Routes>{routes}</Routes>;
};

export default Router;
