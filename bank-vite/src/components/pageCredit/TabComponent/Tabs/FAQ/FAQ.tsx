import React, { useState } from 'react';

import './_faq.scss';
import AccordionItem from '@/components/ui/Accordion/Accordin';

const FAQ: React.FC = () => {
  const [activeTopIndex, setActiveTopIndex] = useState<number | null>(null);
  const [activeBottomIndex, setActiveBottomIndex] = useState<number | null>(null);

  const topItems = [
    {
      title: 'How to get a card?',
      content:
        'We will deliver your card by courier free of charge. Delivery in Moscow and St. Petersburg – 1-2 working days. For other regions of the Russian Federation – 2-5 working days.',
    },
    {
      title: 'What documents are needed and how old should one be to get a card?',
      content: 'Need a passport. You must be between 20 and 70 years old.',
    },
    {
      title: 'In what currency can I issue a card?',
      content: 'In rubles, dollars or euro',
    },
    {
      title: 'How much income do I need to get a credit card?',
      content:
        'To obtain a credit card, you will need an income of at least 25,000 rubles per month after taxes.',
    },
    {
      title: 'How do I find out about the banks decision on my application?',
      content:
        'After registration, you will receive an e-mail with a decision on your application.',
    },
  ];

  const bottomItems = [
    {
      title: 'What is an interest free credit card?',
      content:
        'A credit card with a grace period is a bank card with an established credit limit, designed for payment, reservation of goods and services, as well as for receiving cash, which allows you to use credit funds free of charge for a certain period.',
    },
    {
      title: 'How to activate a credit card',
      content:
        'You can activate your credit card and generate a PIN code immediately after receiving the card at a bank branch using a PIN pad.',
    },
    {
      title: 'What is a settlement date?',
      content:
        'The settlement date is the date from which you can pay off the debt for the reporting period. The settlement date falls on the first calendar day following the last day of the reporting period. The first settlement date is reported by the bank when transferring the issued credit card to the client, and then in the monthly account statement.',
    },
    {
      title: 'What do I need to know about interest rates?',
      content:
        'For each reporting period from the 7th day of the previous month to the 6th day of the current month inclusive, a statement is generated for the credit card. The statement contains information on the amount and timing of the minimum payment, as well as the total amount of debt as of the date of issue.',
    },
  ];

  return (
    <div className='faq'>
      <div className='faq__wrap-top'>
        <h2 className='faq__title'>Issuing and receiving a card</h2>
        {topItems.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            content={item.content}
            isOpen={activeTopIndex === index}
            onClick={() => setActiveTopIndex(activeTopIndex === index ? null : index)}
          />
        ))}
      </div>

      <div className='faq__wrap-bott'>
        <h2 className='faq__title'>Using a credit card</h2>
        {bottomItems.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            content={item.content}
            isOpen={activeBottomIndex === index}
            onClick={() => setActiveBottomIndex(activeBottomIndex === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
