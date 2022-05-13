import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSpendingByUserId } from "../reducks/spending/operations";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListSquares, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import classes from "./MyPage.module.scss";

const MyPage = () => {
  const userId = useSelector(state => state.users.uid);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getSpendingByUserId(userId));
    }
  }, [dispatch, userId]);

  return (
    <div className="section-container center-col">
      <div>
        <FontAwesomeIcon
          icon={faListSquares}
          className={classes["icon-list"]}
        />
        <Link to="/spending">Monthly Spending List</Link>
      </div>
      <div className="spacer-sm" />
      <div>
        <FontAwesomeIcon icon={faCirclePlus} className={classes["icon-add"]} />
        <Link to="/spending/new">Create Spending</Link>
      </div>
    </div>
  );
};

export default MyPage;
