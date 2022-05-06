import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SpendingEdit from "./pages/SpendingEdit";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spending/edit" element={<SpendingEdit />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
