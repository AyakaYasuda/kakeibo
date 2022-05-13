import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  createSpending,
  updateSpending,
} from "../../reducks/spending/operations";
import { useNavigate } from "react-router-dom";

import Button from "../UI/Button";
import classes from "./SpendingForm.module.scss";

const spendingSchema = yup.object().shape({
  category: yup.string().required(),
  title: yup.string().required(),
  amount: yup.number().positive().required(),
  memo: yup.string(),
});

const options = [
  "Entertainment",
  "Shopping",
  "Food & Dining",
  "Health & Fitness",
  "Auto & Transport",
  "Personal Care",
  "Utilities",
  "Travel",
  "Education",
  "Kids",
  "Investments",
  "Others",
];

const SpendingForm = ({ preloadedValues, type, spendingId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginUserId = useSelector(state => state.users.uid);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(spendingSchema),
  });

  useEffect(() => {
    setValue("category", preloadedValues?.category);
    setValue("title", preloadedValues?.title);
    setValue("amount", preloadedValues?.amount);
    setValue("memo", preloadedValues?.memo);
  }, [preloadedValues]);

  const spendingCreateHandler = data => {
    const spending = {
      category: data.category,
      title: data.title,
      amount: data.amount,
      memo: data.memo,
      creator: loginUserId,
    };
    dispatch(createSpending(spending));
    clearFormHandler();
    navigate("/spending");
  };

  const spendingUpdateHandler = data => {
    const spending = {
      id: spendingId,
      category: data.category,
      title: data.title,
      amount: data.amount,
      memo: data.memo,
    };
    dispatch(updateSpending(spendingId, spending));
    clearFormHandler();
    navigate("/spending");
  };

  const clearFormHandler = () => {
    reset();
    navigate("/spending");
  };

  const submitHandler =
    type === "create" ? spendingCreateHandler : spendingUpdateHandler;

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
        <label className={classes["form-label"]} htmlFor="category">
          Category
        </label>
        <select
          className={classes["form-input"]}
          name="category"
          id="category"
          {...register("category")}
        >
          <option value="" disabled hidden>
            Select category
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <p>{errors.category?.message}</p>

        <label className={classes["form-label"]} htmlFor="title">
          Title
        </label>
        <input
          className={classes["form-input"]}
          type="text"
          name="title"
          id="title"
          {...register("title")}
        />
        <p>{errors.title?.message}</p>

        <label className={classes["form-label"]} htmlFor="amount">
          Amount
        </label>
        <input
          className={classes["form-input"]}
          type="number"
          step="0.01"
          name="amount"
          id="amount"
          {...register("amount")}
        />
        <p>{errors.amount?.message}</p>

        <label className={classes["form-label"]} htmlFor="memo">
          Memo
        </label>
        <textarea
          className={classes["form-input"]}
          name="memo"
          rows="5"
          id="memo"
          {...register("memo")}
        />
        <p>{errors.memo?.message}</p>

        <div className="spacer-sm" />
        <div className="center-row">
          <Button onClick={clearFormHandler}>Cancel</Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </>
  );
};

export default SpendingForm;
