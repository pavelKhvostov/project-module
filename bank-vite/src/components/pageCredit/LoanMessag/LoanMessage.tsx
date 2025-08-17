import React from 'react';
import './_loanMessage.scss';

interface ILoanMessageProps {
  title: string;
  text: string;
}

const LoanMessage: React.FC<ILoanMessageProps> = ({ title, text }) => {
  return (
    <section className='message'>
      <div className='container'>
        <div className='message__wrap'>
          <h1 className='message__title'>{title}</h1>
          <p className='message__text'>{text}</p>
        </div>
      </div>
    </section>
  );
};

export default LoanMessage;
