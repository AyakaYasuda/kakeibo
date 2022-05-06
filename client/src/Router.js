import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import MonthlySpendingList from "./pages/MonthlySpendingList";
import SpendingEdit from "./pages/SpendingEdit";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/spending/edit" element={<SpendingEdit />} />
        <Route exact path="/spending" element={<MonthlySpendingList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
