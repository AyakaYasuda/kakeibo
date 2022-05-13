import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MyPage from "./pages/MyPage";
import Auth from "./pages/Auth";
import MonthlySpendingList from "./pages/MonthlySpendingList";
import NewSpending from "./pages/NewSpending";
import SpendingEdit from "./pages/SpendingEdit";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Navigate to="/auth" />} />
        <Route exact path="/auth" element={<Auth />} />
        <Route exact path="/my-page" element={<MyPage />} />
        <Route exact path="/spending/new" element={<NewSpending />} />
        <Route exact path="/spending/edit/:id" element={<SpendingEdit />} />
        <Route exact path="/spending" element={<MonthlySpendingList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
