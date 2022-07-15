import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useUsersErrorModal = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  const { error } = useSelector((state) => state.users);
  const { status, message } = error;

  useEffect(() => {
    if (message.length !== 0) {
      setIsModalShown(true);
    }
  }, [message]);

  const closeModalHandler = () => {
    setIsModalShown(false);
  };

  console.log(error, isModalShown);

  return { isModalShown, status, message, closeModalHandler };
};

export default useUsersErrorModal;
