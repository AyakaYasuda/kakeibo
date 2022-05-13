import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import SpendingCard from "../components/spending/SpendingCard";
import Button from "../components/UI/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import classes from "./MonthlySpendingList.module.scss";

const MonthlySpendingList = () => {
  const spendingList = useSelector(state => state.spending.spendingList);

  if (!spendingList || spendingList.length === 0) {
    return (
      <div className="section-container center-col">
        <p>No spending yet... Create new spending?</p>
        <div className="spacer-sm" />
        <Button to="/spending/new">Create</Button>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      {spendingList.length > 0 &&
        spendingList.map(spending => (
          <SpendingCard data={spending} key={spending.id} />
        ))}
      <Link to={"/spending/new"}>
        <FontAwesomeIcon className={classes["add-btn"]} icon={faCirclePlus} />
      </Link>
    </div>
  );
};

export default MonthlySpendingList;
