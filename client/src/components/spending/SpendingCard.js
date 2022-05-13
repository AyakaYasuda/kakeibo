import React from "react";
import { useDispatch } from "react-redux";
import { deleteSpending } from "../../reducks/spending/operations";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import classes from "./SpendingCard.module.scss";

const SpendingCard = ({ data }) => {
  const dispatch = useDispatch();

  const spendingId = data.id;

  const deleteHandler = () => {
    dispatch(deleteSpending(spendingId));
  };

  return (
    <div className={classes.card}>
      <div className={classes["card-category"]}>
        <p>Category</p>
        <h2>{data.category}</h2>
        <div className={classes["card-options"]}>
          <Link to={`/spending/edit/${spendingId}`}>
            <FontAwesomeIcon
              icon={faPenToSquare}
              className={classes["icon-edit"]}
            />
          </Link>
          <FontAwesomeIcon
            className={classes["icon-delete"]}
            icon={faTrash}
            onClick={deleteHandler}
          />
        </div>
      </div>
      <div className={classes["card-info"]}>
        <h2 className="text-secondary">{data.title}</h2>
        <p>{data.memo}</p>
        <button className={classes["card-btn"]}>
          {`$${data.amount.toFixed(2)}`}
        </button>
      </div>
    </div>
  );
};

export default SpendingCard;
