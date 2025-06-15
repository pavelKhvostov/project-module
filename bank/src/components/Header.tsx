import React from 'react';

const Header: React.FC = () => {
  return (
    <header className='header'>
      <div className='container'>
        <div className='header__wrap'>
          <a href='#' className='header__logo'>
            NeoBank
          </a>
          <nav className='header__nav'>
            <ul className='header__list'>
              <li className='header__item'>
                <a href='#' className='header__link'>
                  Credit card
                </a>
              </li>
              <li className='header__item'>
                <a href='#' className='header__link'>
                  Product
                </a>
              </li>
              <li className='header__item'>
                <a href='#' className='header__link'>
                  Account
                </a>
              </li>
              <li className='header__item'>
                <a href='#' className='header__link'>
                  Resources
                </a>
              </li>
            </ul>
          </nav>
          <button type='button' className='header__btn btn'>
            Online Bank
          </button>
          <button type='button' aria-label='кнопка открыть меню' className='burger'>
            <span className='burger__line'></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
