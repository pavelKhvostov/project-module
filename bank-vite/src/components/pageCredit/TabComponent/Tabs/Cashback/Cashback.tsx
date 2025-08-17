import React, { useState } from 'react';
import './_cashback.scss';

const Cashback: React.FC = () => {
  return (
    <div className='cashback'>
      <div className='cashback__card'>
        <p className='cashback__decr'>For food delivery, cafes and restaurants</p>
        <h3 className='cashback__title'>5%</h3>
      </div>
      <div className='cashback__card cashback__card--dark'>
        <p className='cashback__decr'>In supermarkets with our subscription</p>
        <h3 className='cashback__title'>5%</h3>
      </div>
      <div className='cashback__card'>
        <p className='cashback__decr'>In clothing stores and children's goods</p>
        <h3 className='cashback__title'>2%</h3>
      </div>
      <div className='cashback__card cashback__card--dark'>
        <p className='cashback__decr'>Other purchases and payment of services and fines</p>
        <h3 className='cashback__title'>1%</h3>
      </div>
      <div className='cashback__card'>
        <p className='cashback__decr'>Shopping in online stores</p>
        <h3 className='cashback__title'>up to 3%</h3>
      </div>
      <div className='cashback__card cashback__card--dark'>
        <p className='cashback__decr'>Purchases from our partners</p>
        <h3 className='cashback__title'>30%</h3>
      </div>
    </div>
  );
};

export default Cashback;
