import React, { useState } from 'react';
import './_accordion.scss';

import arrowSvg from '@/assets/img/accord-arrow.svg';

interface IAccordionItemProps {
  title: string;
  content: string;
}

const AccordionItem: React.FC<IAccordionItemProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='accordion'>
      <button
        className={`accordion__header ${isOpen ? 'accordion__header--open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span className='accordion__icon'>
          <img src={arrowSvg} alt='стрелка вниз' />
        </span>
      </button>

      {isOpen && <p className='accordion__text'>{content}</p>}
    </div>
  );
};

export default AccordionItem;
