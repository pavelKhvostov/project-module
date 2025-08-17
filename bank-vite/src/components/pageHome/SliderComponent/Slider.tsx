import React, { useEffect, useRef, useState } from 'react';
import './_slider.scss';
import { IArticle } from '../NewsComponent/News';

interface ISliderProps {
  readonly articles: IArticle[];
}

const Slider: React.FC<ISliderProps> = ({ articles }) => {
  const trackRef = useRef<HTMLUListElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(1);

  const fallbackImage = 'http://dummyimage.com/120';

  const updateVisibleSlides = () => {
    const width = window.innerWidth;
    const slides = width <= 500 ? 1 : width <= 800 ? 2 : 3;
    setVisibleSlides(slides);
    document.documentElement.style.setProperty('--visible-slides', slides.toString());
  };

  useEffect(() => {
    updateVisibleSlides();
    window.addEventListener('resize', updateVisibleSlides);
    return () => window.removeEventListener('resize', updateVisibleSlides);
  }, []);

  const maxIndex = Math.max(0, articles.length - visibleSlides);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const slideEl = track.children[0] as HTMLElement;
    if (!slideEl) return;

    const slideWidth = slideEl.offsetWidth;
    const trackStyles = window.getComputedStyle(track);
    const gapValue = trackStyles.gap || trackStyles.columnGap || '0px';
    const gap = parseFloat(gapValue);

    const safeIndex = Math.min(currentIndex, maxIndex);
    const totalShift = safeIndex * (slideWidth + gap);

    track.style.transform = `translateX(-${totalShift}px)`;
  }, [currentIndex, visibleSlides, articles.length]);

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex >= maxIndex;

  useEffect(() => {
    let startX = 0;
    let endX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      endX = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const swipeDistance = endX - startX;
      const threshold = 50;
      if (swipeDistance > threshold && !isPrevDisabled) {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      } else if (swipeDistance < -threshold && !isNextDisabled) {
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
      }
    };

    const track = trackRef.current;
    track?.addEventListener('touchstart', handleTouchStart);
    track?.addEventListener('touchmove', handleTouchMove);
    track?.addEventListener('touchend', handleTouchEnd);

    return () => {
      track?.removeEventListener('touchstart', handleTouchStart);
      track?.removeEventListener('touchmove', handleTouchMove);
      track?.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isPrevDisabled, isNextDisabled, maxIndex]);

  return (
    <div className='slider'>
      <div className='slider__window'>
        <ul className='slider__track' ref={trackRef}>
          {articles.map((item) => (
            <li key={item.url} className='slider__item slide'>
              <a href={item.url} target='_blank' rel='noreferrer' className='slider__link'>
                <div className='slider__wrap'>
                  <img
                    className='slider__img'
                    src={item.urlToImage}
                    width={256}
                    height={120}
                    alt='новость'
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = fallbackImage;
                    }}
                  />
                  <h3 className='slider__title'>{item.title}</h3>
                </div>
                <p className='slider__descr'>{item.description}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className='slider__bottom'>
        <button
          type='button'
          aria-label='предыдущий слайд'
          className='slider__btn'
          onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
          disabled={isPrevDisabled}
        >
          <svg className='slider__icon' width='25' height='26' viewBox='0 0 25 26' fill='none'>
            <path
              d='M25 17H9.84211V24.3914C9.84211 24.5845 9.59562 24.6655 9.48109 24.5101L1 13L9.48109 1.48994C9.59562 1.33452 9.84211 1.41552 9.84211 1.60858V9H25'
              stroke='#222222'
            />
          </svg>
        </button>

        <button
          type='button'
          aria-label='следующий слайд'
          className='slider__btn slider__btn--next'
          onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))}
          disabled={isNextDisabled}
        >
          <svg className='slider__icon' width='25' height='26' viewBox='0 0 25 26' fill='none'>
            <path
              d='M25 17H9.84211V24.3914C9.84211 24.5845 9.59562 24.6655 9.48109 24.5101L1 13L9.48109 1.48994C9.59562 1.33452 9.84211 1.41552 9.84211 1.60858V9H25'
              stroke='#222222'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Slider;
