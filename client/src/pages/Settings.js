import React from 'react';
import BudgetSettingForm from '../components/budgetSettings/BudgetSettingForm';
import { useSelector } from 'react-redux';

const Settings = () => {
  const { budget } = useSelector((state) => state.users);
  console.log(budget);
  return (
    <>
      <p>Your monthly budget : ${budget}</p>
      {!budget && <BudgetSettingForm />}
    </>
  );
};

export default Settings;
