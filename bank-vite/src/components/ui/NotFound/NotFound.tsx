import React from 'react';
import { Link } from 'react-router-dom';

import notImg from '@/assets/img/notFound.png';
import './_notFound.scss';
import Button from '../ButtonComponent/Button';

function NotFound() {
  return (
    <section className='notFound'>
      <div className='container'>
        <div className='notFound__wrap'>
          <div className='notFound__left'>
            <h2 className='notFound__not-found'>Oops....</h2>
            <h2 className='notFound__not-found'>Page not found</h2>
            <p className='notFound__decr'>
              This Page doesn`t exist or was removed! We suggest you go back.
            </p>

            <Link to='/'>
              <Button className='notFound__button' children='Go back' />
            </Link>
          </div>
          <div className='notFound__right'>
            <img src={notImg} width={526} height={526} alt='Error 404' />
          </div>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
