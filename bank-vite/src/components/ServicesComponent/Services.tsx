import React from 'react';
import currency from '@/assets/data/currency.json';

import pepleSvg from '@/assets/img/services-svg-hero.svg';
import checkSvg from '@/assets/img/checked.svg';
import banckSvg from '@/assets/img/bank-icon.svg';

import './_services.scss';

type TcurrencyProp = {
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
            <img
              className='services__icon'
              src={pepleSvg}
              width='509'
              height='415'
              alt='изображения человека за ноутбуком'
            />
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
                  <img
                    className='services__icon-checked'
                    src={checkSvg}
                    width='20'
                    height='20'
                    alt='изображение галочки'
                  />

                  <span className='services__text'>Powerfull online protection.</span>
                </div>
              </li>
              <li className='services__item'>
                <div className='services__inner'>
                  <img
                    className='services__icon-checked'
                    src={checkSvg}
                    width='20'
                    height='20'
                    alt='изображение галочки'
                  />

                  <span className='services__text'>Cashback without borders.</span>
                </div>
              </li>
              <li className='services__item'>
                <div className='services__inner'>
                  <img
                    className='services__icon-checked'
                    src={checkSvg}
                    width='20'
                    height='20'
                    alt='изображение галочки'
                  />

                  <span className='services__text'>Personal design</span>
                </div>
              </li>
              <li className='services__item'>
                <div className='services__inner'>
                  <img
                    className='services__icon-checked'
                    src={checkSvg}
                    width='20'
                    height='20'
                    alt='изображение галочки'
                  />

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
              {currency.map((item: TcurrencyProp, i) => (
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
            <img
              className='services__icon'
              width='120'
              height='113'
              src={banckSvg}
              alt='изображение банка'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
