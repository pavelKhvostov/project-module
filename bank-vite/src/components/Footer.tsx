import React from 'react';

import logoImg from '@/assets/img/logo-footer.png';

const Footer: React.FC = () => {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='footer__top'>
          <a href='#' className='footer__logo-link'>
            <img src={logoImg} alt='логотип neoflex' />
          </a>

          <div className='footer__top-inner'>
            <a href='tel:+74959842513' className='footer__tel'>
              +7 (495) 984 25 13
            </a>
            <a href='mailto:info@neoflex.ru' className='footer__email'>
              info@neoflex.ru
            </a>
          </div>
        </div>
        <div className='footer__mid'>
          <nav aria-label='навигация в подвале' className='footer__nav'>
            <ul className='footer__list'>
              <li className='footer__item'>
                <a href='' className='footer__link'>
                  About bank
                </a>
              </li>
              <li className='footer__item'>
                <a href='' className='footer__link'>
                  Ask a Question
                </a>
              </li>
              <li className='footer__item'>
                <a href='' className='footer__link'>
                  Quality of service
                </a>
              </li>
              <li className='footer__item'>
                <a href='' className='footer__link'>
                  Requisites
                </a>
              </li>
              <li className='footer__item'>
                <a href='' className='footer__link'>
                  Press center
                </a>
              </li>
              <li className='footer__item'>
                <a href='' className='footer__link'>
                  Bank career
                </a>
              </li>
              <li className='footer__item'>
                <a href='' className='footer__link'>
                  Investors
                </a>
              </li>
              <li className='footer__item'>
                <a href='' className='footer__link'>
                  Analytics
                </a>
              </li>
              <li className='footer__item'>
                <a href='' className='footer__link'>
                  Business and processes
                </a>
              </li>
              <li className='footer__item'>
                <a href='' className='footer__link'>
                  Compliance and business ethics
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className='footer__bottom'>
          <p className='footer__descr-cookie'>
            We use cookies to personalize our services and improve the user experience of our
            website. Cookies are small files containing information about previous visits to a
            website. If you do not want to use cookies, please change your browser settings
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
