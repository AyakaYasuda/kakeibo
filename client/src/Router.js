import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import MonthlySpendingList from "./pages/MonthlySpendingList";
import NewSpending from "./pages/NewSpending";
import SpendingEdit from "./pages/SpendingEdit";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/spending/new" element={<NewSpending />} />
        <Route exact path="/spending/edit/:id" element={<SpendingEdit />} />
        <Route exact path="/spending" element={<MonthlySpendingList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
