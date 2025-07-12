import { useState } from 'react';
import Button from '../ButtonComponent/Button';
import './_form.scss';

interface IFormCardProps {
  step: number;
  children: React.ReactNode;
}

const Form: React.FC<IFormCardProps> = ({ step, children }) => {
  const [amount, setAmount] = useState(150000);

  const min = 15000;
  const max = 600000;
  const percentage = ((amount - min) / (max - min)) * 100;

  const sliderStyle = {
    background: `linear-gradient(to right, #6c2bd9 0%, #6c2bd9 ${percentage}%, #e7ecf2 ${percentage}%, #e7ecf2 100%)`,
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  return (
    <section className='form'>
      {step === 1 ? (
        <div className='form__header'>
          <div className='form__wrap-left'>
            <div className='form__wrap-top'>
              <h2 className='form__title'>Customize your card</h2>
              <span className='form__step'>{`Step ${step} of 5`}</span>
            </div>

            <div className='form__select'>
              <div className='form__select-top'>
                <label htmlFor='amount' className='form__label'>
                  Select amount
                </label>

                <div className='form__value'>{amount.toLocaleString('ru-RU')}</div>
              </div>

              <input
                type='range'
                id='amount'
                name='amount'
                min='15000'
                max='600000'
                step='1000'
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className='form__slider'
                style={sliderStyle}
              />

              <div className='form__range-labels'>
                <span className='form__price'>15 000</span>
                <span className='form__price'>600 000</span>
              </div>
            </div>
          </div>

          <div className='form__wrap-right'>
            <div className='form__wrap-choice'>
              <h3 className='form__heading'>You have chosen the amount</h3>
              <span className='form__value'>{amount.toLocaleString('ru-RU')} ₽</span>
            </div>
          </div>
        </div>
      ) : (
        <div className='form__header'>
          <h2 className='form__title'>Customize your card</h2>
          <span className='form__step'>{`Step ${step} of 5`}</span>
        </div>
      )}

      <div className='form__body'>{children}</div>

      <Button type='submit'>Continue</Button>
    </section>
  );
};

export default Form;
