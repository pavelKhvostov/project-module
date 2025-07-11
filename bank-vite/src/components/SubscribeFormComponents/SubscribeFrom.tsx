import React, { useEffect, useState } from 'react';

import './_form-subscribe.scss';

import emailSvg from '@/assets/img/email.svg';
import sendSvg from '@/assets/img/send.svg';

const SubscribeForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('isSubscribed');
    if (saved === 'true') {
      setIsSubscribed(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubscribed(true);
        localStorage.setItem('isSubscribed', 'true');
      } else {
        alert('Ошибка при подписке');
      }
    } catch (error) {
      console.error('Ошибка при запросе:', error);
      alert('Сервер недоступен');
    }
  };

  return isSubscribed ? (
    <p className='form-subscribe__confirmed'>
      You are already subscribed to the bank&apos;s newsletter.
    </p>
  ) : (
    <form className='form-subscribe' onSubmit={handleSubmit}>
      <div className='form-subscribe__inner'>
        <img
          className='form-subscribe__icon'
          src={emailSvg}
          width='27'
          height='37'
          alt='изображение письма'
        />
        <input
          type='email'
          className='form-subscribe__input'
          placeholder='Your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type='submit' className='form-subscribe__btn'>
        <img
          className='form-subscribe__icon'
          src={sendSvg}
          width='27'
          height='29'
          alt='изображение телеграмма'
        />
        <span className='form-subscribe__text'>Subscribe</span>
      </button>
    </form>
  );
};

export default SubscribeForm;
