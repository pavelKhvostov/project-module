import React from 'react';

import './_form-subscribe.scss';

import emailSvg from '@/assets/img/email.svg';
import sendSvg from '@/assets/img/send.svg';

const SubscribeForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className='form-subscribe' onSubmit={handleSubmit}>
      <div className='form-subscribe__inner'>
        <img
          className='form-subscribe__icon'
          src={emailSvg}
          width='27'
          height='37'
          alt='изображение письма'
        />

        <input type='text' className='form-subscribe__input' placeholder='Your email' />
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
