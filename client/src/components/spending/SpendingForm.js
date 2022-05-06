import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { createSpendingAction } from "../../reducks/spending/actions";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Button from "../UI/Button";
import classes from "./SpendingForm.module.scss";

const spendingSchema = yup.object().shape({
  category: yup.string().required(),
  title: yup.string().required(),
  amount: yup.number().positive().required(),
  memo: yup.string().required(),
});

const SpendingForm = ({ preloadedValues }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(preloadedValues);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(spendingSchema),
    defaultValues: preloadedValues,
  });

  const spendingSubmitHandler = data => {
    const spending = {
      id: uuidv4(),
      category: data.category,
      title: data.title,
      amount: data.amount,
      memo: data.memo,
    };
    dispatch(createSpendingAction(spending));
    clearFormHandler();
    navigate("/spending");
  };

  const clearFormHandler = () => {
    reset();
    navigate("/spending");
  };

  return (
    <>
      <form
        className={classes.form}
        onSubmit={handleSubmit(spendingSubmitHandler)}
      >
        <label className={classes["form-label"]} htmlFor="category">
          Category
        </label>
        <select
          className={classes["form-input"]}
          name="category"
          id="category"
          defaultValue={"default"}
          {...register("category")}
        >
          <option value={"default"} disabled hidden>
            Select category
          </option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Food & Dining">Food & Dining</option>
          <option value="Health & Fitness">Health & Fitness</option>
          <option value="Auto & Transport">Auto & Transport</option>
          <option value="Personal Care">Personal Care</option>
          <option value="Utilities">Utilities</option>
          <option value="Travel">Travel</option>
          <option value="Education">Education</option>
          <option value="Kids">Kids</option>
          <option value="Investments">Investments</option>
          <option value="Others">Others</option>
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
