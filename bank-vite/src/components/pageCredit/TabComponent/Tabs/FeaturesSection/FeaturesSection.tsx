import React from 'react';

import './_featuresSection.scss';

import moneySvg from '@/assets/img/Money_duotone.svg';
import calendarSvg from '@/assets/img/Calendar_duotone.svg';
import clockSvg from '@/assets/img/Clock_duotone.svg';
import bagSvg from '@/assets/img/Bag_duotone.svg';
import creditSvg from '@/assets/img/Credit card_duotone.svg';

const FeaturesSection: React.FC = () => {
  return (
    <div className='features-section'>
      <div className='features-section__card'>
        <img src={moneySvg} width={40} height={40} alt='money svg' />
        <h3 className='features-section__title'>Up to 50 000 ₽</h3>
        <p className='features-section__decr'>Cash and transfers without commission and percent</p>
      </div>
      <div className='features-section__card features-section__card--dark'>
        <img src={calendarSvg} width={40} height={40} alt='money svg' />
        <h3 className='features-section__title'>Up to 160 days</h3>
        <p className='features-section__decr'>Without percent on the loan</p>
      </div>
      <div className='features-section__card'>
        <img src={clockSvg} width={40} height={40} alt='money svg' />
        <h3 className='features-section__title'>Free delivery</h3>
        <p className='features-section__decr'>
          We will deliver your card by courier at a convenient place and time for you
        </p>
      </div>
      <div className='features-section__card features-section__card--dark'>
        <img src={bagSvg} width={40} height={40} alt='money svg' />
        <h3 className='features-section__title'>Up to 12 months</h3>
        <p className='features-section__decr'>
          No percent. For equipment, clothes and other purchases in installments
        </p>
      </div>
      <div className='features-section__card'>
        <img src={creditSvg} width={40} height={40} alt='money svg' />
        <h3 className='features-section__title'>Convenient deposit and withdrawal</h3>
        <p className='features-section__decr'>
          At any ATM. Top up your credit card for free with cash or transfer from other cards
        </p>
      </div>
    </div>
  );
};

export default FeaturesSection;
