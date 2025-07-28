import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import './_finalStep.scss';
import finalImg from '@/assets/img/offer.png';
import Button from '@/components/ui/ButtonComponent/Button';

const FinalStep = () => {
  const navigate = useNavigate();
  const { applicationId } = useParams();

  const handleClick = () => {
    if (applicationId) {
      localStorage.removeItem(`ApplicationData_${applicationId}`);
      localStorage.removeItem(`registrationSubmitted_${applicationId}`);

      const history = JSON.parse(localStorage.getItem('ApplicationHistory') || '[]');
      const updated = history.filter((id: string | number) => id.toString() !== applicationId);
      localStorage.setItem('ApplicationHistory', JSON.stringify(updated));

      if (localStorage.getItem('SelectedAppId') === applicationId) {
        localStorage.removeItem('SelectedAppId');
      }
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
