import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useFilter from '../../hooks/useFilter';

import FacePalming from '../../assets/images/facepalming.png';
import Scared from '../../assets/images/scared.png';
import Good from '../../assets/images/good.png';

const Status = () => {
  const currentYearAndMonth =
    new Date().getFullYear().toString() +
    '-' +
    ('0' + (new Date().getMonth() + 1).toString()).slice(-2);
  const [status, setStatus] = useState();
  const [image, setImage] = useState();
  const { monthlyTotalSpending } = useFilter(currentYearAndMonth);
  const { budget } = useSelector((state) => state.users);

  useEffect(() => {
    if (monthlyTotalSpending && budget) {
      if (budget < monthlyTotalSpending) {
        setStatus('danger');
        setImage(FacePalming);
      } else if (
        budget === monthlyTotalSpending ||
        budget * 0.8 < monthlyTotalSpending
      ) {
        setStatus('warning');
        setImage(Scared);
      } else {
        setStatus('good');
        setImage(Good);
      }
    }
  }, [monthlyTotalSpending, budget]);

  console.log(status, image);

  return (
    <>
      <div>{status}</div>
      <div>
        <img src={image} />
      </div>
    </>
  );
};

export default Status;
