import React from 'react';
import ReactDOM from 'react-dom';

import Backdrop from './Backdrop';
import Button from './Button';
import Oops from '../../assets/images/oops.png';
import classes from './ErrorModal.module.scss';

const ModalContent = ({ message, onClose }) => {
  const content = (
    <div className={classes['modal-content']}>
      <h1>Oops! Something went wrong...</h1>
      <h3>{message}</h3>
      <img src={Oops} alt="Oops" />
      <Button onClick={onClose}>try again</Button>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const ErrorModal = ({ show, onClose, message }) => {
  return show ? (
    <>
      <Backdrop onClick={onClose} />
      <ModalContent message={message} onClose={onClose} />
    </>
  ) : (
    <></>
  );
};

export default ErrorModal;
