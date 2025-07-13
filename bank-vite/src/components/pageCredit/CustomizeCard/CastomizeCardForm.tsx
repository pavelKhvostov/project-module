import React, { useState } from 'react';
import './_castomizeCardForm.scss';
import Form from '@/components/ui/FormComponent.tsx/Form';

const CustomizeCardForm: React.FC = () => {
  const [dateInputType, setDateInputType] = useState<'text' | 'date'>('text');

  return (
    <section className='customize-card'>
      <div className='container'>
        <Form step={1}>
          <h2 className='customize-card__title'>Contact Information</h2>
          <div className='customize-card__fields'>
            <div className='customize-card__field'>
              <label className='customize-card__label' htmlFor='lastName'>
                Your last name <span>*</span>
              </label>
              <input
                className='customize-card__input'
                type='text'
                id='lastName'
                placeholder='For Example Doe'
              />
            </div>

            <div className='customize-card__field'>
              <label className='customize-card__label' htmlFor='firstName'>
                Your first name <span>*</span>
              </label>
              <input
                className='customize-card__input'
                type='text'
                id='firstName'
                placeholder='For Example Jhon'
              />
            </div>

            <div className='customize-card__field'>
              <label className='customize-card__label' htmlFor='patronymic'>
                Your patronymic
              </label>
              <input
                className='customize-card__input'
                type='text'
                id='patronymic'
                placeholder='For Example Victorovich'
              />
            </div>

            <div className='customize-card__field'>
              <label className='customize-card__label' htmlFor='term'>
                Select term <span>*</span>
              </label>
              <select className='customize-card__input' id='term'>
                <option value='6'>6 month</option>
                <option value='12'>12 month</option>
                <option value='24'>24 month</option>
              </select>
            </div>

            <div className='customize-card__field'>
              <label className='customize-card__label' htmlFor='email'>
                Your email <span>*</span>
              </label>
              <input
                className='customize-card__input'
                type='email'
                id='email'
                placeholder='test@gmail.com'
              />
            </div>

            <div className='customize-card__field'>
              <label className='customize-card__label' htmlFor='birth'>
                Your date of birth <span>*</span>
              </label>
              <input
                id='birth'
                className='customize-card__input'
                type={dateInputType}
                placeholder='Select Date and Time'
                onFocus={() => setDateInputType('date')}
              />
            </div>

            <div className='customize-card__field'>
              <label className='customize-card__label' htmlFor='passportSeries'>
                Your passport series <span>*</span>
              </label>
              <input
                className='customize-card__input'
                type='text'
                id='passportSeries'
                placeholder='0000'
              />
            </div>

            <div className='customize-card__field'>
              <label className='customize-card__label' htmlFor='passportNumber'>
                Your passport number <span>*</span>
              </label>
              <input
                className='customize-card__input'
                type='text'
                id='passportNumber'
                placeholder='000000'
              />
            </div>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default CustomizeCardForm;
