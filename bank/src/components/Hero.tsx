import React from 'react';
import img from '@/assets/data/card.json';

type imgProp = {
  id: number;
  imgUrl: string;
};

const Hero: React.FC = () => {
  return (
    <section className='hero'>
      <div className='container'>
        <div className='hero__wrap'>
          <div className='hero__left'>
            <h2 className='hero__title'>Choose the design you like and apply for card right now</h2>
            <button type='button' className='btn'>
              Choose the card
            </button>
          </div>
          <div className='hero__right'>
            <ul className='hero__list'>
              {img.map((item: imgProp) => (
                <li className='hero__item' key={item.id}>
                  <img src={item.imgUrl} width={252} height={150} alt='изображение карты' />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
