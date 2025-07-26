import React from 'react';

import offerImg from '@/assets/img/offer.png';
import Button from '@/components/ui/ButtonComponent/Button';
import './_offerCard.scss';

const OfferCard = () => {
  return (
    <div className='offer-card'>
      <img
        className='offer-card__img'
        src={offerImg}
        width={150}
        height={150}
        alt='коробка с конфетти'
      />
      <div className='offer-card__wrap'>
        <span className='offer-card__text'>Requested amount: 200 000 ₽</span>
        <span className='offer-card__text'>Total amount: 200 000 ₽</span>
        <span className='offer-card__text'>For 24 months</span>
        <span className='offer-card__text'>Monthly payment: 9 697 ₽</span>
        <span className='offer-card__text'>Your rate: 15%</span>
        <span className='offer-card__text'>Insurance included</span>
        <span className='offer-card__text'>Salary client</span>
      </div>
      <Button className='offer-card__btn' children='Select' type='submit' />
    </div>
  );
};

export default OfferCard;
