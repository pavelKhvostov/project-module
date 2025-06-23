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
              <svg className='slider__icon' width='25' height='25' aria-hidden='true'>
                <use xlinkHref='img/sprite.svg#arrow-icon'></use>
              </svg>
            </button>
            <button
              type='button'
              aria-label='кнопка следующего слайда'
              className='slider__btn slider__btn--next'
            >
              <svg className='slider__icon' width='25' height='25' aria-hidden='true'>
                <use xlinkHref='img/sprite.svg#arrow-icon'></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default News;
