import React from 'react';
import currency from '@/assets/data/currency.json';

type currencyProp = {
  code: string;
  value: number;
};

const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString('ru-RU', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

const Services: React.FC = () => {
  return (
    <section className='services'>
      <div className='container'>
        <div className='services__wrap'>
          <div className='services__left'>
            <svg className='services__icon' width='509' height='415' aria-hidden='true'>
              <use xlinkHref='img/sprite.svg#services-icon-hero'></use>
            </svg>
          </div>
          <div className='services__right'>
            <h2 className='services__title'>We Provide Many Features You Can Use</h2>
            <p className='services__descr'>
              You can explore the features that we provide with fun and have their own functions
              each feature
            </p>
            <ul className='services__list'>
              <li className='services__item'>
                <div className='services__inner'>
                  <svg className='services__icon-checked' width='20' height='20' aria-hidden='true'>
                    <use xlinkHref='img/sprite.svg#checked-icon'></use>
                  </svg>
                  <span className='services__text'>Powerfull online protection.</span>
                </div>
              </li>
              <li className='services__item'>
                <div className='services__inner'>
                  <svg className='services__icon-checked' width='20' height='20' aria-hidden='true'>
                    <use xlinkHref='img/sprite.svg#checked-icon'></use>
                  </svg>
                  <span className='services__text'>Cashback without borders.</span>
                </div>
              </li>
              <li className='services__item'>
                <div className='services__inner'>
                  <svg className='services__icon-checked' width='20' height='20' aria-hidden='true'>
                    <use xlinkHref='img/sprite.svg#checked-icon'></use>
                  </svg>
                  <span className='services__text'>Personal design</span>
                </div>
              </li>
              <li className='services__item'>
                <div className='services__inner'>
                  <svg width='20' height='20' aria-hidden='true'>
                    <use xlinkHref='img/sprite.svg#checked-icon'></use>
                  </svg>
                  <span className='services__text'>Work anywhere in the world</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className='services__currency'>
          <div className='services__curr-left-inner'>
            <h3 className='services__heding'>Exchange rate in internet bank</h3>
            <span className='services__curr-text'>Currency</span>
            <ul className='services__curr-list'>
              {currency.map((item: currencyProp, i) => (
                <li key={i} className='services__item'>
                  <span className='services__code'>{item.code}: </span>
                  <span className='services__val'>{item.value}</span>
                </li>
              ))}
            </ul>
            <a href='#' className='services__link'>
              All courses
            </a>
          </div>
          <div className='services__curr-right-inner'>
            <span className='services__text-date'>
              Update every 15 minutes, MSC {formattedDate}
            </span>
            <svg className='services__icon' width='120' height='113' aria-hidden='true'>
              <use xlinkHref='img/sprite.svg#bank-icon'></use>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
