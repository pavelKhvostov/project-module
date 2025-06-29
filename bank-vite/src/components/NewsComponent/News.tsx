import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './_news.scss';

import Slider from '../SliderComponent/Slider';

export interface IArticle {
  urlToImage: string;
  title: string;
  url: string;
  description: string;
}

const API_KEY = '2c28465154834c0f918c1bb4d946819b';
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`;

const News: React.FC = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(API_URL);
        const filteredArticles = (response.data.articles as IArticle[])
          .filter(
            (article) =>
              article.urlToImage?.startsWith('http') &&
              article.description &&
              !/<[^>]*>/g.test(article.description),
          )
          .slice(0, 20);
        setArticles(filteredArticles);
      } catch (error) {
        console.error('Ошибка при загрузке новостей:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <section className='news'>
      <div className='container'>
        <h2 className='news__title'>Current news from the world of finance</h2>
        <span className='news__text'>
          We update the news feed every 15 minutes. You can learn more by clicking on the news you
          are interested in.
        </span>
        {isLoading ? <p className='news_loading'>loading...</p> : <Slider articles={articles} />}
      </div>
    </section>
  );
};
export default News;
