import React from 'react';
import { NavLink } from 'react-router-dom';

import Button from '../../ui/ButtonComponent/Button';
import BurgerButton from '../BurgerComponent/Burger';

import './_header.scss';

const Header: React.FC = () => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'header__link header__link--active' : 'header__link';

  return (
    <header className='header'>
      <div className='container'>
        <div className='header__wrap'>
          <NavLink to='/' className='header__logo'>
            NeoBank
          </NavLink>

          <nav className='header__nav'>
            <ul className='header__list'>
              <li className='header__item'>
                <NavLink to='/credit-card' className={getNavLinkClass}>
                  Credit card
                </NavLink>
              </li>
              <li className='header__item'>
                <NavLink to='/product' className={getNavLinkClass}>
                  Product
                </NavLink>
              </li>
              <li className='header__item'>
                <NavLink to='/account' className={getNavLinkClass}>
                  Account
                </NavLink>
              </li>
              <li className='header__item'>
                <NavLink to='/resources' className={getNavLinkClass}>
                  Resources
                </NavLink>
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
