import React from 'react';

import mapSvg from '@/assets/img/map-icon.svg';

const Map: React.FC = () => {
  return (
    <section className='map'>
      <div className='container'>
        <h2 className='map__title'>You can use our services anywhere in the world</h2>
        <span className='map__text'>
          Withdraw and transfer money online through our application
        </span>
        <img className='map__icon' src={mapSvg} width='1060' height='537' alt='изображение карты' />
      </div>
    </section>
  );
};
export default Map;
