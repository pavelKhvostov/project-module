import React from 'react';
import './_burger.scss';

type TBurgerButtonProps = {
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
};

const BurgerButton: React.FC<TBurgerButtonProps> = ({
  onClick,
  className = '',
  ariaLabel = 'Кнопка открыть меню',
}) => {
  return (
    <button
      type='button'
      aria-label={ariaLabel}
      className={`burger ${className}`}
      onClick={onClick}
    >
      <span className='burger__line'></span>
    </button>
  );
};

export default BurgerButton;
