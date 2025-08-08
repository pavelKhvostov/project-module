import React, { useEffect, useState } from 'react';
import axios from 'axios';

import pepleSvg from '@/assets/img/services-svg-hero.svg';
import checkSvg from '@/assets/img/checked.svg';
import bankSvg from '@/assets/img/bank-icon.svg';

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
const FORCE_FETCH = import.meta.env.VITE_FORCE_FETCH_RATES === 'true';

const CACHE_KEY = 'currency_rates_cache';
const CACHE_TTL = 1000 * 60 * 14;

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

const fetchAllRates = async (
  codes: TCurrencyCode[] = Object.keys(CURRENCY_NAMES) as TCurrencyCode[],
  force: boolean = false,
): Promise<ICurrencyRate[]> => {
  const cached = localStorage.getItem(CACHE_KEY);

  if (!force && !FORCE_FETCH && cached) {
    try {
      const { timestamp, data } = JSON.parse(cached);
      const isFresh = Date.now() - timestamp < CACHE_TTL;
      if (isFresh) {
        return data;
      }
    } catch (error) {
      console.warn('Ошибка чтения кэша валют:', error);
    }
  }

  const result: ICurrencyRate[] = [];

  for (const code of codes) {
    const data = await getExchangeRate(code);
    if (data) {
      result.push(data);
    }
  }

  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({
      timestamp: Date.now(),
      data: result,
    }),
  );

  return result;
};

interface ServicesProps {
  currencyCodes?: TCurrencyCode[];
}

const Services: React.FC<ServicesProps> = ({ currencyCodes }) => {
  const [rates, setRates] = useState<ICurrencyRate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const formattedDate = new Date().toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const loadRates = async (force: boolean = false) => {
    setIsLoading(true);
    const data = await fetchAllRates(currencyCodes, force);
    setRates(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadRates();

    const intervalId = setInterval(
      () => {
        loadRates(true);
      },

      15 * 60 * 1000,
    );

    return () => {
      clearInterval(intervalId);
    };
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
              {[
                'Powerfull online protection.',
                'Cashback without borders.',
                'Personal design',
                'Work anywhere in the world',
              ].map((text, index) => (
                <li className='services__item' key={index}>
                  <div className='services__inner'>
                    <img className='services__icon-checked' src={checkSvg} alt='✔' />
                    <span className='services__text'>{text}</span>
                  </div>
                </li>
              ))}
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
            <img className='services__icon' src={bankSvg} width='120' height='113' alt='...' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
