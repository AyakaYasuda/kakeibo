import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import SpendingForm from '../components/spending/SpendingForm';

import classes from './SpendingEdit.module.scss';

const SpendingEdit = () => {
  const spendingId = useParams().id;
  const spendingList = useSelector((state) => state.spending.spendingList);

  const [category, setCategory] = useState();
  const [title, setTitle] = useState();
  const [amount, setAmount] = useState();
  const [memo, setMemo] = useState();
  const [createdAt, setCreatedAt] = useState(
    new Date().toISOString().slice(0, 10)
  );

  useEffect(() => {
    const identifiedSpending = spendingList.find(
      (spending) => spending.id === spendingId
    );
    setCategory(identifiedSpending.category);
    setTitle(identifiedSpending.title);
    setAmount(identifiedSpending.amount);
    setMemo(identifiedSpending.memo);
    setCreatedAt(
      new Date(identifiedSpending.createdAt).toISOString().slice(0, 10)
    );
  }, [spendingId, spendingList]);

  const preloadedValues = {
    category: category,
    title: title,
    amount: amount,
    memo: memo,
    createdAt: createdAt,
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Update your spending?</h2>
      <div className="spacer-sm" />
      <SpendingForm
        preloadedValues={preloadedValues}
        type="update"
        spendingId={spendingId}
      />
    </div>
  );
};

export default SpendingEdit;
