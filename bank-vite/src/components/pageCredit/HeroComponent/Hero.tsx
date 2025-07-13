import React from 'react';
import './_credit-hero.scss';
import Button from '@/components/ui/ButtonComponent/Button';
import imgCard1 from '@/assets/img/card-1.jpg';
import Tooltip from '@/components/ui/Tooltip/Tooltip';

interface HeroProps {
  onApplyClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onApplyClick }) => {
  return (
    <section className='credit-hero'>
      <div className='container'>
        <div className='credit-hero__wrap'>
          <div className='credit-hero__left'>
            <h2 className='credit-hero__title'>Platinum digital credit card</h2>
            <p className='credit-hero__decr'>
              Our best credit card. Suitable for everyday spending and shopping. Cash withdrawals
              and transfers without commission and interest.
            </p>
            <ul className='credit-hero__list'>
              <li className='credit-hero__item'>
                <Tooltip text='When repaying the full debt up to 160 days.' position='bottom'>
                  <span>
                    <span className='credit-hero__top'>Up to 160 days</span>
                    <span className='credit-hero__bottom'>No percent</span>
                  </span>
                </Tooltip>
              </li>
              <li className='credit-hero__item'>
                <Tooltip text='Over the limit willaccrue percent' position='bottom'>
                  <span>
                    <span className='credit-hero__top'>Up to 600 000 ₽</span>
                    <span className='credit-hero__bottom'>Credit limit</span>
                  </span>
                </Tooltip>
              </li>
              <li className='credit-hero__item'>
                <Tooltip text='Promotion valid until December 31, 2022.' position='bottom'>
                  <span>
                    <span className='credit-hero__top'>0 ₽</span>
                    <span className='credit-hero__bottom'>Card service is free</span>
                  </span>
                </Tooltip>
              </li>
            </ul>
            <Button className='credit-hero__btn' onClick={onApplyClick}>
              Apply for card
            </Button>
          </div>
          <div className='credit-hero__right'>
            <img className='credit-hero__img' width={380} height={227} src={imgCard1} alt='card' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
