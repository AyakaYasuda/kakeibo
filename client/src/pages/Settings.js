import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import BudgetSettingForm from '../components/budgetSettings/BudgetSettingForm';
import { useSelector } from 'react-redux';
import { getBudgetById } from '../reducks/users/operations';

const Settings = () => {
  const dispatch = useDispatch();
  const { budget, uid } = useSelector((state) => state.users);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (uid) {
      dispatch(getBudgetById(uid));
    }
  }, [uid]);

  return (
    <>
      <p>Your monthly budget : ${budget?.toLocaleString()}</p>
      {!isEditing && <button onClick={() => setIsEditing(true)}>Edit</button>}
      {(!budget || isEditing) && (
        <BudgetSettingForm setIsEditing={setIsEditing} />
      )}
    </>
  );
};

export default Settings;
