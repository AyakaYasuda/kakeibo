import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useUsersErrorModal = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  const { error } = useSelector((state) => state.users);
  const { status, message } = error;

  useEffect(() => {
    if (error) {
      setIsModalShown(true);
    }
  }, [error]);

  const closeModalHandler = () => {
    setIsModalShown(false);
  };

  return { isModalShown, status, message, closeModalHandler };
};

export default useUsersErrorModal;
