import React from 'react';
import './_stepGetCard.scss';

const StepGetCard: React.FC = () => {
  return (
    <section className='step-get-card'>
      <div className='container'>
        <h2 className='step-get-card__title'>How to get a card</h2>
        <ul className='step-get-card__ul'>
          <li className='step-get-card__item'>
            <div className='step-get-card__wrap'>
              <span className='step-get-card__num'>1</span>
              <span className='step-get-card__bott'></span>
            </div>
            <p className='step-get-card__decr'>
              Fill out an online application - you do not need to visit the bank
            </p>
          </li>
          <li className='step-get-card__item'>
            <div className='step-get-card__wrap'>
              <span className='step-get-card__num'>2</span>
              <span className='step-get-card__bott'></span>
            </div>
            <p className='step-get-card__decr'>
              Find out the bank's decision immediately after filling out the application
            </p>
          </li>
          <li className='step-get-card__item'>
            <div className='step-get-card__wrap'>
              <span className='step-get-card__num'>3</span>
              <span className='step-get-card__bott'></span>
            </div>
            <p className='step-get-card__decr'>
              The bank will deliver the card free of charge, wherever convenient, to your city
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default StepGetCard;
