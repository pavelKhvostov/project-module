import React from 'react';

import './_news.scss';

import Slider from '../SliderComponent/Slider';

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
        <Slider slides={slides} />
      </div>
    </section>
  );
};
export default News;
