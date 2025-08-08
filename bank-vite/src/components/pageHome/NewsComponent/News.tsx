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

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const PAGE_SIZE = 20;

const isValidImageUrl = (url: string | null | undefined): boolean => {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return /^https?:\/\//.test(url) && /\.(jpg|jpeg|png|webp|gif)$/i.test(parsed.pathname);
  } catch {
    return false;
  }
};

const News: React.FC = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPage = async (page: number) => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=${PAGE_SIZE}&page=${page}&apiKey=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  };

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const firstPageData = await fetchPage(1);

        let filteredArticles = (firstPageData.articles as IArticle[]).filter(
          (article) =>
            article.description &&
            !/<[^>]*>/g.test(article.description) &&
            isValidImageUrl(article.urlToImage),
        );

        if (
          filteredArticles.length < PAGE_SIZE &&
          firstPageData.totalResults > filteredArticles.length
        ) {
          const secondPageData = await fetchPage(2);
          const secondPageFiltered = (secondPageData.articles as IArticle[]).filter(
            (article) =>
              article.description &&
              !/<[^>]*>/g.test(article.description) &&
              isValidImageUrl(article.urlToImage),
          );
          filteredArticles = [...filteredArticles, ...secondPageFiltered];
        }

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

        {isLoading ? <p className='news_loading'>Loading...</p> : <Slider articles={articles} />}
      </div>
    </section>
  );
};

export default News;
