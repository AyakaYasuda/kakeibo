import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Button from "../components/Button";
import classes from "./SpendingEdit.module.scss";

const spendingSchema = yup.object().shape({
  category: yup.string().required(),
  title: yup.string().required(),
  amount: yup.number().positive().required(),
  memo: yup.string().required(),
});

const SpendingEdit = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(spendingSchema),
  });

  const spendingSubmitHandler = data => {
    console.log(data);
  };

  const clearFormHandler = () => {
    reset();
  };

  return (
    <>
      <div className="section-container">
        <h3 className={classes.title}>What did you spend money on?</h3>
        <div className="spacer-sm" />
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
            <option value="entertainment">Entertainment</option>
            <option value="shopping">Shopping</option>
            <option value="food-and-dining">Food & Dining</option>
            <option value="health-and-fitness">Health & Fitness</option>
            <option value="auto-and-transport">Auto & Transport</option>
            <option value="personal-care">Personal Care</option>
            <option value="utilities">Utilities</option>
            <option value="travel">Travel</option>
            <option value="education">Education</option>
            <option value="kids">Kids</option>
            <option value="investments">Investments</option>
            <option value="others">Others</option>
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
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SpendingEdit;
