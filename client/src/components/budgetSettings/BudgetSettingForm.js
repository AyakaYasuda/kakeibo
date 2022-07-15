import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addBudget } from '../../reducks/users/operations';

import Button from '../UI/Button';
import classes from './BudgetSettingForm.module.scss';

const budgetSchema = yup.object().shape({
  budget: yup.number().positive().required(),
});

const BudgetSettingForm = ({ setIsEditing }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    uid,
    token,
    budget: preloadedValue,
  } = useSelector((state) => state.users);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(budgetSchema),
  });

  useEffect(() => {
    if (preloadedValue) {
      setValue('budget', preloadedValue);
    }
  }, [preloadedValue, setValue]);

  const submitHandler = (data) => {
    const budget = { budget: data.budget };
    if (uid && token) {
      dispatch(addBudget(uid, token, budget));
      clearFormHandler();
      setIsEditing(false);
    }
  };

  const clearFormHandler = () => {
    reset();
    navigate('/settings');
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
      <label htmlFor="budget" className={classes['form-label']}>
        Your monthly budget
      </label>
      <input
        type="number"
        id="budget"
        name="budget"
        step="0.01"
        {...register('budget')}
        className={classes['form-input']}
      />
      {errors.budget?.message && (
        <p className={classes['form-error-message']}>
          budget is a required field
        </p>
      )}
      <div className={classes['form-buttons']}>
        {preloadedValue ? (
          <Button type="submit" size="small">
            Update
          </Button>
        ) : (
          <Button type="submit" size="small">
            submit
          </Button>
        )}
        <Button size="small" onClick={() => setIsEditing(false)}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default BudgetSettingForm;
