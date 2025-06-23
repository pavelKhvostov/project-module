import React from 'react';

import emailSvg from '@/assets/img/email.svg';
import sendSvg from '@/assets/img/send.svg';
import { send } from 'process';

const Support: React.FC = () => {
  return (
    <section className='support'>
      <div className='container'>
        <span className='support__text'>Support</span>
        <h2 className='support__title'>Subscribe Newsletter & get</h2>
        <span className='support__text-bottom'>Bank News</span>
        <form className='form-subscribe'>
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
      </div>
    </section>
  );
};
export default Support;
