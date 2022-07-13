import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSpending } from '../../reducks/spending/operations';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import classes from './SpendingCard.module.scss';

const SpendingCard = ({ data }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.token);

  const spendingId = data.id;
  const createDate = `${new Date(data.createdAt).getFullYear().toString()}-${(
    '0' + (new Date(data.createdAt).getMonth() + 1).toString()
  ).slice(-2)}-${('0' + new Date(data.createdAt).getDate().toString()).slice(
    -2
  )}`;
  const deleteHandler = () => {
    dispatch(deleteSpending(spendingId, token));
  };

  return (
    <div className={classes.card}>
      <div className={classes['card-category']}>
        <p>Category</p>
        <h2>{data.category}</h2>
        <div className={classes['card-options']}>
          <Link to={`/spending/edit/${spendingId}`}>
            <FontAwesomeIcon
              icon={faPenToSquare}
              className={classes['icon-edit']}
            />
          </Link>
          <FontAwesomeIcon
            className={classes['icon-delete']}
            icon={faTrash}
            onClick={deleteHandler}
          />
        </div>
      </div>
      <div className={classes['card-info']}>
        <small>{createDate}</small>
        <h2 className="text-secondary">{data.title}</h2>
        <p>{data.memo}</p>
        <button className={classes['card-btn']}>
          {`$${data.amount.toFixed(2)}`}
        </button>
      </div>
    </div>
  );
};

export default SpendingCard;
