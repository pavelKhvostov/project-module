import React from 'react';
import slides from '@/assets/data/news.json';

const News: React.FC = () => {
  return (
    <section className='news'>
      <div className='container'>
        <h2 className='news__title'>Current news from the world of finance</h2>
        <span className='news__text'>
          We update the news feed every 15 minutes. You can learn more by clicking on the news you
          are interested in.
        </span>
        <div className='slider'>
          <div className='slider__window'>
            <ul className='slider__track'>
              {/* <div id='loading' className='slider__loading'>
                  Загрузка...
                </div> */}
              {slides.map((item) => (
                <li key={item.id} className='slider__item slide'>
                  <a href='#' className='slider__link'>
                    <div className='slider__wrap'>
                      <img
                        className='slider__img'
                        src={item.img}
                        width={256}
                        height={120}
                        alt='изображение новости'
                      />
                      <h3 className='slider__title'>{item.title}</h3>
                    </div>
                    <p className='slider__descr'>{item.desc}</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className='slider__bottom'>
            <button type='button' aria-label='кнопка предыдущего слайда' className='slider__btn'>
              <svg
                className='slider__icon'
                width='25'
                height='26'
                viewBox='0 0 25 26'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M25 17H9.84211V24.3914C9.84211 24.5845 9.59562 24.6655 9.48109 24.5101L1 13L9.48109 1.48994C9.59562 1.33452 9.84211 1.41552 9.84211 1.60858V9H25'
                  stroke='#222222'
                />
              </svg>
            </button>
            <button
              type='button'
              aria-label='кнопка следующего слайда'
              className='slider__btn slider__btn--next'
            >
              <svg
                className='slider__icon'
                width='25'
                height='26'
                viewBox='0 0 25 26'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M25 17H9.84211V24.3914C9.84211 24.5845 9.59562 24.6655 9.48109 24.5101L1 13L9.48109 1.48994C9.59562 1.33452 9.84211 1.41552 9.84211 1.60858V9H25'
                  stroke='#222222'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default News;
