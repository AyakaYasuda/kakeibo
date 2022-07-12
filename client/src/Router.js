import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, logout } from './reducks/users/operations';

import MyPage from './pages/MyPage';
import Auth from './pages/Auth';
import MonthlySpendingList from './pages/MonthlySpendingList';
import NewSpending from './pages/NewSpending';
import SpendingEdit from './pages/SpendingEdit';

const Router = () => {
  const dispatch = useDispatch();
  const storedData = JSON.parse(localStorage.getItem('userData'));
  const token = storedData?.token;
  const expiration = storedData?.expiration;
  console.log(token, expiration);

  // auto login
  useEffect(() => {
    if (token && new Date(storedData.expiration) > new Date()) {
      // FIXME: fetch user data by user id then create userState
      const userState = {
        email: storedData.email,
        password: storedData.password,
      };
      console.log(userState);
      console.log('auto login running');
      dispatch(login(userState, new Date(expiration)));
    }
  }, [storedData, dispatch]);

  // auto logout
  let logoutTimer;
  useEffect(() => {
    if ((token, expiration)) {
      const remainingTime = new Date(expiration) - new Date().getTime();

      logoutTimer = setTimeout(dispatch(logout()), remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, expiration, dispatch]);

  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route exact path="/my-page" element={<MyPage />} />
        <Route exact path="/spending/new" element={<NewSpending />} />
        <Route exact path="/spending/edit/:id" element={<SpendingEdit />} />
        <Route exact path="/spending" element={<MonthlySpendingList />} />
        <Route exact path="*" element={<Navigate to="/my-page" replace />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route exact path="/auth" element={<Auth />} />
        <Route exact path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    );
  }

  return <BrowserRouter>{routes}</BrowserRouter>;
};

export default Router;
