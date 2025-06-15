import React from 'react';

const Support: React.FC = () => {
  return (
    <section className='support'>
      <div className='container'>
        <span className='support__text'>Support</span>
        <h2 className='support__title'>Subscribe Newsletter & get</h2>
        <span className='support__text-bottom'>Bank News</span>
        <form className='form-subscribe'>
          <div className='form-subscribe__inner'>
            <svg className='form-subscribe__icon' width='27' height='37' aria-hidden='true'>
              <use xlinkHref='img/sprite.svg#email-icon'></use>
            </svg>
            <input type='text' className='form-subscribe__input' placeholder='Your email' />
          </div>
          <button type='submit' className='form-subscribe__btn'>
            <svg className='form-subscribe__icon' width='27' height='29' aria-hidden='true'>
              <use xlinkHref='img/sprite.svg#send-icon'></use>
            </svg>
            <span className='form-subscribe__text'>Subscribe</span>
          </button>
        </form>
      </div>
    </section>
  );
};
export default Support;
