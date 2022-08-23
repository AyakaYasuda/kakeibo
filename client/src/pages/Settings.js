import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import BudgetSettingForm from '../components/budgetSettings/BudgetSettingForm';
import { useSelector } from 'react-redux';
import { getBudgetById } from '../reducks/users/operations';

import Button from '../components/UI/Button';
import FingersCrossed from '../assets/images/fingers-crossed.png';
import FistedHand from '../assets/images/fisted-hand.png';
import classes from './Settings.module.scss';

const Settings = () => {
  const dispatch = useDispatch();
  const { budget, uid } = useSelector((state) => state.users);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (uid) {
      dispatch(getBudgetById(uid));
    }
  }, [uid, dispatch]);

  return (
    <div className={classes.container}>
      {budget ? (
        <div className={classes.budget}>
          <h2>Your monthly budget</h2>
          <h1>${Number(budget?.toFixed(2)).toLocaleString()}</h1>
          <img src={FistedHand} alt="fisted-hand" className={classes.image} />
          {!isEditing && (
            <Button size="small" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
        </div>
      ) : (
        <div className={classes.title}>
          <h1>Create your monthly budget</h1>
          <img
            src={FingersCrossed}
            alt="fingers crossed"
            className={classes.image}
          />
        </div>
      )}
      {(!budget || isEditing) && (
        <BudgetSettingForm setIsEditing={setIsEditing} />
      )}
    </div>
  );
};

export default Settings;
