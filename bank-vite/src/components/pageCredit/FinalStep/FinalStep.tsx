import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './_finalStep.scss';
import finalImg from '@/assets/img/offer.png';
import Button from '@/components/ui/ButtonComponent/Button';
import { resetApplication } from '@/redux/slices/applicationSlice';
import { resetScoring } from '@/redux/slices/scoringSlice';

const FinalStep = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { applicationId } = useParams();

  const handleClick = () => {
    if (applicationId) {
      const currentId = Number(applicationId);

      localStorage.removeItem(`reduxState__${currentId}`);
      const historyRaw = localStorage.getItem('SelectedAppIds');
      if (historyRaw) {
        const history: number[] = JSON.parse(historyRaw);
        const updated = history.filter((id) => id !== currentId);
        localStorage.setItem('SelectedAppIds', JSON.stringify(updated));
      }

      dispatch(resetApplication());
      dispatch(resetScoring());
    }

    navigate('/');
  };

  return (
    <section className='finale'>
      <div className='container'>
        <div className='finale__wrap'>
          <img src={finalImg} alt='' />
          <h1 className='finale__title'>
            Congratulations! You have completed your new credit card.
          </h1>
          <p className='finale__text'>
            Your credit card will arrive soon. Thank you for choosing us!
          </p>
          <Button onClick={handleClick}>View other offers of our bank</Button>
        </div>
      </div>
    </section>
  );
};

export default FinalStep;
