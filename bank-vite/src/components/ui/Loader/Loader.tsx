import React from 'react';
import loaderSvg from '@/assets/img/Spinner.svg';

import './_loader.scss';

const Loader: React.FC = () => {
  return (
    <div className='loader'>
      <img src={loaderSvg} alt='Загрузка...' className='loader__spinner' />
    </div>
  );
};

export default Loader;
