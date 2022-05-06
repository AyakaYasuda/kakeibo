import React from "react";
import { useSelector } from "react-redux";
import SpendingCard from "../components/spending/SpendingCard";
import Button from "../components/UI/Button";
import classes from "./MonthlySpendingList.module.scss";

const DUMMY_SPENDING = [
  {
    id: "s1",
    category: "Shopping",
    title: "boots",
    amount: 121.89,
    memo: "A treat for myself",
  },
  {
    id: "s2",
    category: "Food & Dining",
    title: "korean chicken",
    amount: 15.6,
    memo: "UberEats",
  },
];

const MonthlySpendingList = () => {
  const spending = useSelector(state => state.spending.spendingList);

  const loadedSpending = DUMMY_SPENDING.concat(spending);

  if (!loadedSpending || loadedSpending.length === 0) {
    return (
      <div className="section-container center-col">
        <p>No spending yet... Create new spending?</p>
        <div className="spacer-sm" />
        <Button to="/spending/edit">Create</Button>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      {loadedSpending.length > 0 &&
        loadedSpending.map(spending => (
          <SpendingCard data={spending} key={spending.id} />
        ))}
    </div>
  );
};

export default MonthlySpendingList;
