import React from "react";
import { useSelector } from "react-redux";

const MonthlySpendingList = () => {
  const spending = useSelector(state => state);
  console.log(spending);
  return <div>MonthlySpendingList</div>;
};

export default MonthlySpendingList;
