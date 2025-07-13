import { useState } from 'react';
import Button from '../ButtonComponent/Button';
import './_form.scss';

interface IFormCardProps {
  step: number;
  children: React.ReactNode;
}

const Form: React.FC<IFormCardProps> = ({ step, children }) => {
  const min = 15000;
  const max = 600000;

  const [amount, setAmount] = useState<number>(150000);
  const [amountInput, setAmountInput] = useState<string>('150000');

  const parsedAmount = Number(amountInput);

  const percentage = ((amount - min) / (max - min)) * 100;

  const sliderStyle = {
    background: `linear-gradient(to right, #6c2bd9 0%, #6c2bd9 ${percentage}%, #e7ecf2 ${percentage}%, #e7ecf2 100%)`,
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setAmount(value);
    setAmountInput(String(value));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountInput(e.target.value);
  };

  const handleInputBlur = () => {
    let value = Number(amountInput);

    if (isNaN(value)) {
      value = min;
    } else if (value < min) {
      value = min;
    } else if (value > max) {
      value = max;
    }

    setAmount(value);
    setAmountInput(String(value));
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
                min={min}
                max={max}
                step='1'
                value={amount}
                onChange={handleRangeChange}
                className='form__slider'
                style={sliderStyle}
              />

              <div className='form__range-labels'>
                <span className='form__price'>{min.toLocaleString('ru-RU')}</span>
                <span className='form__price'>{max.toLocaleString('ru-RU')}</span>
              </div>
            </div>
          </div>

          <div className='form__wrap-right'>
            <div className='form__wrap-choice'>
              <h3 className='form__heading'>You have chosen the amount</h3>

              <div className='form__amount-wrapper'>
                <input
                  type='number'
                  className='form__amount-input'
                  value={amountInput}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                />
              </div>
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

      <Button className='form__button' type='submit'>
        Continue
      </Button>
    </section>
  );
};

export default Form;
