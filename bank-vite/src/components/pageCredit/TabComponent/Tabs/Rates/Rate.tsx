import React from 'react';

import './_rate.scss';

const Rate: React.FC = () => {
  return (
    <div className='rate'>
      <table className='rate__table'>
        <tbody className='rate__body'>
          <tr className='rate__row'>
            <td className='rate__label'>Card currency</td>
            <td className='rate__value'>Rubles, dollars, euro</td>
          </tr>
          <tr className='rate__row'>
            <td className='rate__label'>Interest free period</td>
            <td className='rate__value'>0% up to 160 days</td>
          </tr>
          <tr className='rate__row'>
            <td className='rate__label'>Payment system</td>
            <td className='rate__value'>Mastercard, Visa</td>
          </tr>
          <tr className='rate__row'>
            <td className='rate__label'>Maximum credit limit on the card</td>
            <td className='rate__value'>600 000 ₽</td>
          </tr>
          <tr className='rate__row'>
            <td className='rate__label'>Replenishment and withdrawal</td>
            <td className='rate__value'>
              At any ATM. Top up your credit card for free with cash or transfer from other cards
            </td>
          </tr>
          <tr className='rate__row'>
            <td className='rate__label'>Max cashback per month</td>
            <td className='rate__value'>15 000 ₽</td>
          </tr>
          <tr className='rate__row'>
            <td className='rate__label'>Transaction Alert</td>
            <td className='rate__value'>
              60 ₽ — SMS or push notifications
              <br />0 ₽ — card statement, information about transactions in the online bank
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Rate;
