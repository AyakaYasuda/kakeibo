import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addBudget } from '../../reducks/users/operations';

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
  }, [preloadedValue]);

  const submitHandler = (data) => {
    const budget = { budget: data.budget };
    if (uid && token) {
      console.log(budget, typeof budget);
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
    <form onSubmit={handleSubmit(submitHandler)}>
      <label htmlFor="budget">Your monthly budget</label>
      <input
        type="number"
        id="budget"
        name="budget"
        step="0.01"
        {...register('budget')}
      />
      {errors.budget?.message && <p>budget is a required field</p>}
      {preloadedValue ? (
        <button type="submit">Update your budget</button>
      ) : (
        <button type="submit">Add your budget</button>
      )}
      <button onClick={() => setIsEditing(false)}>Cancel</button>
    </form>
  );
};

export default BudgetSettingForm;
