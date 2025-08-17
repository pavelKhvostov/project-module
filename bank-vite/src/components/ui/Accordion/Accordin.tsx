import React from 'react';
import './_accordion.scss';
import arrowSvg from '@/assets/img/accord-arrow.svg';

interface IAccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<IAccordionItemProps> = ({ title, content, isOpen, onClick }) => {
  return (
    <div className='accordion'>
      <button
        className={`accordion__header ${isOpen ? 'accordion__header--open' : ''}`}
        onClick={onClick}
      >
        {title}
        <span className='accordion__icon'>
          <img src={arrowSvg} alt='arrow' />
        </span>
      </button>
      {isOpen && <p className='accordion__text'>{content}</p>}
    </div>
  );
};

export default AccordionItem;
