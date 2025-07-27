import { useState, useEffect } from 'react';
import Button from '../ButtonComponent/Button';
import './_form.scss';

interface IFormCardProps {
  step: number;
  children: React.ReactNode;
  onSubmit: () => void;
  amount?: number;
  setAmount?: (val: number) => void;
}

const Form: React.FC<IFormCardProps> = ({ step, children, onSubmit, amount, setAmount }) => {
  const MIN_AMOUNT = 15000;
  const MAX_AMOUNT = 600000;

  const [amountInput, setAmountInput] = useState<string>(String(amount));

  const currentAmount = amount!;
  const updateAmount = setAmount!;

  useEffect(() => {
    setAmountInput(String(currentAmount));
  }, [currentAmount]);

  const percentage = ((currentAmount - MIN_AMOUNT) / (MAX_AMOUNT - MIN_AMOUNT)) * 100;

  const sliderStyle = {
    background: `linear-gradient(to right, #6c2bd9 0%, #6c2bd9 ${percentage}%, #e7ecf2 ${percentage}%, #e7ecf2 100%)`,
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    updateAmount(value);
    setAmountInput(String(value));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountInput(e.target.value);
  };

  const handleInputBlur = () => {
    let value = Number(amountInput);

    if (isNaN(value)) value = MIN_AMOUNT;
    else if (value < MIN_AMOUNT) value = MIN_AMOUNT;
    else if (value > MAX_AMOUNT) value = MAX_AMOUNT;

    updateAmount(value);
    setAmountInput(String(value));
  };

  return (
    <form className='form' onSubmit={onSubmit}>
      <div className='form__loan-controls'>
        <div className='form__header'>
          <div className='form__wrap-left'>
            <div className='form__wrap-top'>
              <h2 className='form__title'>Customize your card</h2>
              <span className='form__step'>{`Step ${step} of 5`}</span>
            </div>
            {step === 1 && (
              <>
                <div className='form__select'>
                  <div className='form__select-top'>
                    <label htmlFor='amount' className='form__label'>
                      Select amount
                    </label>
                    <div className='form__value'>{currentAmount.toLocaleString('ru-RU')}</div>
                  </div>

                  <input
                    type='range'
                    id='amount'
                    name='amount'
                    min={MIN_AMOUNT}
                    max={MAX_AMOUNT}
                    step='1'
                    value={currentAmount}
                    onChange={handleRangeChange}
                    className='form__slider'
                    style={sliderStyle}
                  />

                  <div className='form__range-labels'>
                    <span className='form__price'>{MIN_AMOUNT.toLocaleString('ru-RU')}</span>
                    <span className='form__price'>{MAX_AMOUNT.toLocaleString('ru-RU')}</span>
                  </div>
                </div>
              </>
            )}
          </div>
          {step === 1 && (
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
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();

                        let value = Number(amountInput);

                        if (isNaN(value)) value = MIN_AMOUNT;
                        else if (value < MIN_AMOUNT) value = MIN_AMOUNT;
                        else if (value > MAX_AMOUNT) value = MAX_AMOUNT;

                        updateAmount(value);
                        setAmountInput(String(value));
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='form__body'>{children}</div>

      <Button className='form__button' type='submit'>
        Continue
      </Button>
    </form>
  );
};

export default Form;
