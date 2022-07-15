import React from 'react';

import SpendingForm from '../components/spending/SpendingForm';
import useSpendingErrorModal from '../hooks/useSpendingErrorModal';
import ErrorModal from '../components/UI/ErrorModal';

import classes from './NewSpending.module.scss';

const NewSpending = () => {
  const { isModalShown, message, closeModalHandler } = useSpendingErrorModal();

  return (
    <>
      {isModalShown && (
        <ErrorModal
          show={isModalShown}
          onClose={closeModalHandler}
          message={message}
        />
      )}
      <div className={classes.container}>
        <h2 className={classes.title}>What did you spend money on?</h2>
        <SpendingForm type="create" />
      </div>
    </>
  );
};

export default NewSpending;
