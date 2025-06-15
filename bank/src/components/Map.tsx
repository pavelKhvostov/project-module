import React from 'react';

const Map: React.FC = () => {
  return (
    <section className='map'>
      <div className='container'>
        <h2 className='map__title'>You can use our services anywhere in the world</h2>
        <span className='map__text'>
          Withdraw and transfer money online through our application
        </span>
        <svg className='map__icon' width='1060' height='537' aria-hidden='true'>
          <use xlinkHref='img/sprite.svg#map-icon'></use>
        </svg>
      </div>
    </section>
  );
};
export default Map;
