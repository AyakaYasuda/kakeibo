import React from "react";

import SpendingForm from "../components/spending/SpendingForm";

import classes from "./NewSpending.module.scss";

const NewSpending = () => {
  return (
    <>
      <div className="section-container">
        <h2 className={classes.title}>What did you spend money on?</h2>
        <div className="spacer-sm" />
        <SpendingForm type="create" />
      </div>
    </>
  );
};

export default NewSpending;
