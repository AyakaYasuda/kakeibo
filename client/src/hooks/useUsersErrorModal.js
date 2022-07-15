import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetError } from '../reducks/users/operations';

const useUsersErrorModal = () => {
  const dispatch = useDispatch();
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
    dispatch(resetError())
  };

  return { isModalShown, status, message, closeModalHandler };
};

export default useUsersErrorModal;
