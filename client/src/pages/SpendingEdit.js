import React from "react";
import classes from "./SpendingEdit.module.scss";

import Button from "../components/Button";

const SpendingEdit = () => {
  return (
    <>
      <div className="section-container">
        <h3 className={classes.title}>What did you spend money on?</h3>
        <div className="spacer-sm" />
        <form className={classes.form}>
          <label className={classes["form-label"]} htmlFor="categories">
            Category
          </label>
          <select
            className={classes["form-input"]}
            name="categories"
            id="categories"
          >
            <option defaultValue="" disabled hidden>
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
          <label className={classes["form-label"]} htmlFor="title">
            Title
          </label>
          <input
            className={classes["form-input"]}
            type="text"
            name="title"
            id="title"
          />
          <label className={classes["form-label"]} htmlFor="title">
            Amount
          </label>
          <input
            className={classes["form-input"]}
            type="text"
            name="amount"
            id="amount"
          />
          <label className={classes["form-label"]} htmlFor="title">
            Memo
          </label>
          <textarea
            className={classes["form-input"]}
            name="memo"
            rows="5"
            id="memo"
          />
          <div className="spacer-sm" />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </>
  );
};

export default SpendingEdit;
