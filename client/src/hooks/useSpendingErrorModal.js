import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useSpendingErrorModal = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  const { error } = useSelector((state) => state.spending);
  const { status, message } = error;

  useEffect(() => {
    if (message.length !== 0) {
      setIsModalShown(true);
    }
  }, [message]);

  const closeModalHandler = () => {
    setIsModalShown(false);
  };

  return { isModalShown, status, message, closeModalHandler };
};

export default useSpendingErrorModal;
