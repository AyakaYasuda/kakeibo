import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MyPage from "./pages/MyPage";
import Auth from "./pages/Auth";
import MonthlySpendingList from "./pages/MonthlySpendingList";
import NewSpending from "./pages/NewSpending";
import SpendingEdit from "./pages/SpendingEdit";

const Router = () => {
  const token = useSelector(state => state.users.token);

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
