import React, { useEffect, useState } from 'react';
import axios from 'axios';

import pepleSvg from '@/assets/img/services-svg-hero.svg';
import checkSvg from '@/assets/img/checked.svg';
import banckSvg from '@/assets/img/bank-icon.svg';

import './_services.scss';

type TCurrencyCode = 'USD' | 'EUR' | 'CNY' | 'CHF' | 'TRY' | 'JPY';

interface ICurrencyRate {
  code: TCurrencyCode;
  rate: number;
}

const CURRENCY_NAMES: Record<TCurrencyCode, string> = {
  USD: 'USD',
  EUR: 'EUR',
  CNY: 'CNY',
  CHF: 'CHF',
  TRY: 'TRY',
  JPY: 'JPY',
};

const ACCESS_KEY = import.meta.env.VITE_SERVICES_API_KEY;

const getExchangeRate = async (code: TCurrencyCode): Promise<ICurrencyRate | null> => {
  const url = `https://v6.exchangerate-api.com/v6/${ACCESS_KEY}/pair/${code}/RUB`;
  try {
    const response = await axios.get(url);
    const rate = response.data.conversion_rate;
    if (rate) {
      return {
        code,
        rate: Number(rate.toFixed(2)),
      };
    }
    return null;
  } catch (error) {
    console.error(`Ошибка при получении курса ${code}:`, error);
    return null;
  }
};

// Универсальная функция получения курсов для переданного списка валют
const fetchAllRates = async (
  codes: TCurrencyCode[] = Object.keys(CURRENCY_NAMES) as TCurrencyCode[],
): Promise<ICurrencyRate[]> => {
  const result: ICurrencyRate[] = [];

  for (const code of codes) {
    const data = await getExchangeRate(code);
    if (data) {
      result.push(data);
    }
  }

  return result;
};

interface ServicesProps {
  currencyCodes?: TCurrencyCode[];
}

const Services: React.FC<ServicesProps> = ({ currencyCodes }) => {
  const [rates, setRates] = useState<ICurrencyRate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  useEffect(() => {
    const loadRates = async () => {
      setIsLoading(true);
      const data = await fetchAllRates(currencyCodes);
      setRates(data);
      setIsLoading(false);
    };

    loadRates();
    const interval = setInterval(loadRates, 1000 * 60 * 15); // обновлять каждые 15 минут

    return () => clearInterval(interval);
  }, [currencyCodes]);

  return (
    <section className='services'>
      <div className='container'>
        <div className='services__wrap'>
          <div className='services__left'>
            <img className='services__icon' src={pepleSvg} width='509' height='415' alt='...' />
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
                  <img className='services__icon-checked' src={checkSvg} alt='✔' />
                  <span className='services__text'>Powerfull online protection.</span>
                </div>
              </li>
              <li className='services__item'>
                <div className='services__inner'>
                  <img className='services__icon-checked' src={checkSvg} alt='✔' />
                  <span className='services__text'>Cashback without borders.</span>
                </div>
              </li>
              <li className='services__item'>
                <div className='services__inner'>
                  <img className='services__icon-checked' src={checkSvg} alt='✔' />
                  <span className='services__text'>Personal design</span>
                </div>
              </li>
              <li className='services__item'>
                <div className='services__inner'>
                  <img className='services__icon-checked' src={checkSvg} alt='✔' />
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
            {isLoading ? (
              <p className='services__loading'>loading...</p>
            ) : (
              <ul className='services__curr-list'>
                {rates.map((item) => (
                  <li key={item.code} className='services__item'>
                    <span className='services__code'>{item.code}: </span>
                    <span className='services__val'>{item.rate}</span>
                  </li>
                ))}
              </ul>
            )}
            <a href='#' className='services__link'>
              All courses
            </a>
          </div>
          <div className='services__curr-right-inner'>
            <span className='services__text-date'>
              Update every 15 minutes, MSC {formattedDate}
            </span>
            <img className='services__icon' src={banckSvg} width='120' height='113' alt='...' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
