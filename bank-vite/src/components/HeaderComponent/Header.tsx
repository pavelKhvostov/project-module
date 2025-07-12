import React from 'react';
import Button from '../ButtonComponent/Button';
import BurgerButton from '../BurgerComponent/Burger';
import { Link } from 'react-router-dom';

import './_header.scss';

const Header: React.FC = () => {
  return (
    <header className='header'>
      <div className='container'>
        <div className='header__wrap'>
          <Link to='/' className='header__logo'>
            NeoBank
          </Link>
          <nav className='header__nav'>
            <ul className='header__list'>
              <li className='header__item'>
                <Link to='/credit-card' className='header__link'>
                  Credit card
                </Link>
              </li>
              <li className='header__item'>
                <Link to='/product' className='header__link'>
                  Product
                </Link>
              </li>
              <li className='header__item'>
                <Link to='/account' className='header__link'>
                  Account
                </Link>
              </li>
              <li className='header__item'>
                <Link to='/resources' className='header__link'>
                  Resources
                </Link>
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
