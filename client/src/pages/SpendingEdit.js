import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import SpendingForm from "../components/spending/SpendingForm";

import classes from "./SpendingEdit.module.scss";

const SpendingEdit = () => {
  const spendingId = useParams().id;
  const spendingList = useSelector(state => state.spending.spendingList);

  const [category, setCategory] = useState();
  const [title, setTitle] = useState();
  const [amount, setAmount] = useState();
  const [memo, setMemo] = useState();

  useEffect(() => {
    const identifiedSpending = spendingList.find(
      spending => spending.id === spendingId
    );
    setCategory(identifiedSpending.category);
    setTitle(identifiedSpending.title);
    setAmount(identifiedSpending.amount);
    setMemo(identifiedSpending.memo);
  }, []);

  const preloadedValues = {
    category: category,
    title: title,
    amount: amount,
    memo: memo,
  };

  return (
    <>
      <div className="section-container">
        <h2 className={classes.title}>Update your spending?</h2>
        <SpendingForm preloadedValues={preloadedValues} />
        <div className="spacer-sm" />
      </div>
    </>
  );
};

export default SpendingEdit;
