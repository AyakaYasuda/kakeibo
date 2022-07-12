import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { autoLogin, logout } from './reducks/users/operations';

import MyPage from './pages/MyPage';
import Auth from './pages/Auth';
import MonthlySpendingList from './pages/MonthlySpendingList';
import NewSpending from './pages/NewSpending';
import SpendingEdit from './pages/SpendingEdit';

const Router = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [expiration, setExpiration] = useState();
  const storedData = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    if (storedData) {
      setToken(storedData.token);
      setUserId(storedData.uid);
      setExpiration(storedData.expiration);
    } else {
      setToken(null);
      setUserId(null);
      setExpiration(null);
    }
  }, [storedData]);

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
