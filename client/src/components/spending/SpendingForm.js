import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  createSpending,
  updateSpending,
} from '../../reducks/spending/operations';
import { useNavigate } from 'react-router-dom';
import categories from '../../util/categories';

import Button from '../UI/Button';
import classes from './SpendingForm.module.scss';

const spendingSchema = yup.object().shape({
  category: yup.string().required(),
  title: yup.string().required(),
  amount: yup.number().positive().required(),
  memo: yup.string(),
  createdAt: yup.date().required(),
});

const SpendingForm = ({ preloadedValues, type, spendingId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginUserId = useSelector((state) => state.users.uid);
  const token = useSelector((state) => state.users.token);
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
    setValue('category', preloadedValues?.category);
    setValue('title', preloadedValues?.title);
    setValue('amount', preloadedValues?.amount);
    setValue('memo', preloadedValues?.memo);
    setValue('createdAt', preloadedValues?.createdAt);
  }, [preloadedValues, setValue]);

  const createSpendingHandler = (data) => {
    const spending = {
      category: data.category,
      title: data.title,
      amount: data.amount,
      memo: data.memo,
      creator: loginUserId,
      createdAt: new Date(data.createdAt).toISOString(),
    };
    dispatch(createSpending(spending, token));
    clearFormHandler();
    navigate('/spending');
  };

  const updateSpendingHandler = (data) => {
    const spending = {
      id: spendingId,
      category: data.category,
      title: data.title,
      amount: data.amount,
      memo: data.memo,
      createdAt: new Date(data.createdAt).toISOString(),
    };
    dispatch(updateSpending(spendingId, spending, token));
    clearFormHandler();
    navigate('/spending');
  };

  const clearFormHandler = () => {
    reset();
    navigate('/spending');
  };

  const submitHandler =
    type === 'create' ? createSpendingHandler : updateSpendingHandler;

  return (
    <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
      <label className={classes['form-label']} htmlFor="createDate">
        Date
      </label>
      <input
        className={classes['form-input']}
        type="date"
        id="createDate"
        name="createDate"
        {...register('createdAt')}
        min="2021-01-01"
        max="2023-12-31"
      />
      {errors.createdAt?.message && (
        <p className={classes['form-error-message']}>
          date is a required field
        </p>
      )}

      <label className={classes['form-label']} htmlFor="category">
        Category
      </label>
      <select
        className={classes['form-input']}
        name="category"
        id="category"
        {...register('category')}
      >
        <option value="" disabled hidden>
          Select category
        </option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      <p className={classes['form-error-message']}>
        {errors.category?.message}
      </p>

      <label className={classes['form-label']} htmlFor="title">
        Title
      </label>
      <input
        className={classes['form-input']}
        type="text"
        name="title"
        id="title"
        {...register('title')}
      />
      <p className={classes['form-error-message']}>{errors.title?.message}</p>

      <label className={classes['form-label']} htmlFor="amount">
        Amount
      </label>
      <input
        className={classes['form-input']}
        type="number"
        step="0.01"
        name="amount"
        id="amount"
        {...register('amount')}
      />
      <p className={classes['form-error-message']}>{errors.amount?.message}</p>

      <label className={classes['form-label']} htmlFor="memo">
        Memo
      </label>
      <textarea
        className={classes['form-input']}
        name="memo"
        rows="5"
        id="memo"
        {...register('memo')}
      />
      <p className={classes['form-error-message']}>{errors.memo?.message}</p>

      <div className="spacer-sm" />
      <div className={classes['form-buttons']}>
        <Button onClick={clearFormHandler}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default SpendingForm;
