import React from 'react';
import Button from '../ButtonComponent/Button';
import BurgerButton from '../BurgerComponent/Burger';

import './_header.scss';

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

          <Button className='header__btn'>Online Bank</Button>
          <BurgerButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
