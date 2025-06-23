import React from 'react';
import imgCard1 from '@/assets/img/card-1.jpg';
import imgCard2 from '@/assets/img/card-2.jpg';
import imgCard3 from '@/assets/img/card-3.jpg';
import imgCard4 from '@/assets/img/card-4.jpg';
import Button from '../ButtonComponent/Button';

import './_hero.scss';

const Hero: React.FC = () => {
  return (
    <section className='hero'>
      <div className='container'>
        <div className='hero__wrap'>
          <div className='hero__left'>
            <h2 className='hero__title'>Choose the design you like and apply for card right now</h2>
            <Button type='button'>Choose the card</Button>
          </div>
          <div className='hero__right'>
            <ul className='hero__list'>
              <li className='hero__item'>
                <img src={imgCard1} width={252} height={150} alt='изображение карты' />
              </li>
              <li className='hero__item'>
                <img src={imgCard2} width={252} height={150} alt='изображение карты' />
              </li>
              <li className='hero__item'>
                <img src={imgCard3} width={252} height={150} alt='изображение карты' />
              </li>
              <li className='hero__item'>
                <img src={imgCard4} width={252} height={150} alt='изображение карты' />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
