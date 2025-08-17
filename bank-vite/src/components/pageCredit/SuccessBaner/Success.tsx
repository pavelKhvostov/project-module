import React from 'react';

import './_success.scss';

const Success = () => {
  return (
    <div className='success'>
      <h2 className='success__title'>The preliminary decision has been sent to your email.</h2>
      <p className='success__decr'>
        In the letter you can get acquainted with the preliminary decision on the credit card.
      </p>
    </div>
  );
};

export default Success;
