import React, { useState, forwardRef } from 'react';
import './_castomizeCardForm.scss';
import Form from '@/components/ui/FormComponent.tsx/Form';
import errorSvg from '@/assets/img/Close_round_fill.svg';
import checkSvg from '@/assets/img/Check_fill.svg';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import Loader from '@/components/ui/Loader/Loader';
import OfferCard from '../OfferCard/OfferCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { setOffers, selectOffer, IOffer } from '@/redux/slices/offerSlices';
import { setApplicationId, setStatus } from '@/redux/slices/applicationSlice';
import Success from '../SuccessBaner/Success';

interface IFormValues {
  lastName: string;
  firstName: string;
  patronymic?: string;
  term: string;
  email: string;
  birth: string;
  passportSeries: string;
  passportNumber: string;
}

interface IApplicationPayload {
  amount: number;
  term: number;
  firstName: string;
  lastName: string;
  middleName: string | null;
  email: string;
  birthdate: string | Date;
  passportSeries: string;
  passportNumber: string;
}

const getMaxBirthdate = () => {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 18);
  return today.toISOString().split('T')[0];
};

const getMinBirthdate = () => {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 75);
  return today.toISOString().split('T')[0];
};

const CustomizeCardForm = forwardRef<HTMLDivElement>((_, ref) => {
  const [dateInputType, setDateInputType] = useState<'text' | 'date'>('text');
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState<number>(150000);

  const status = useSelector((state: RootState) => state.application.status);
  const offers = useSelector((state: RootState) => state.offers.offers);
  const dispatch = useDispatch();

  const methods = useForm<IFormValues>({ mode: 'onSubmit', defaultValues: { term: '6' } });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = methods;

  const renderIcon = (fieldName: keyof IFormValues) => {
    const value = watch(fieldName)?.toString().trim();
    if (errors[fieldName])
      return <img src={errorSvg} alt='error' className='input-field__input-icon' />;
    if (value) return <img src={checkSvg} alt='valid' className='input-field__input-icon' />;
    return null;
  };

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    setIsLoading(true);
    const payload: IApplicationPayload = {
      amount,
      term: Number(data.term),
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      middleName: data.patronymic?.trim() || null,
      email: data.email,
      birthdate: data.birth,
      passportSeries: data.passportSeries,
      passportNumber: data.passportNumber,
    };

    try {
      const response = await axios.post('http://localhost:8080/application', payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      const offers = response.data;
      const applicationId = offers?.[0]?.applicationId;

      if (applicationId) {
        dispatch(setApplicationId(applicationId));
        dispatch(setStatus('PRESCORING_SUCCESS'));
        localStorage.setItem('SelectedAppId', JSON.stringify(applicationId));
      }

      dispatch(setOffers(offers));
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOfferSelect = async (offer: IOffer) => {
    try {
      await axios.post('http://localhost:8080/application/apply', offer, {
        headers: { 'Content-Type': 'application/json' },
      });

      dispatch(selectOffer(offer));
      dispatch(setStatus('OFFER_SELECTED'));
    } catch (err) {
      console.error('Ошибка при выборе предложения:', err);
    }
  };

  return (
    <section className='customize-card' ref={ref}>
      <div className='container'>
        {status === 'OFFER_SELECTED' ? (
          <Success />
        ) : offers.length > 0 ? (
          <div className='customize-card__offer-wrap'>
            {offers
              .slice()
              .sort((a, b) => b.rate - a.rate || b.totalAmount - a.totalAmount)
              .map((offer, index) => (
                <OfferCard key={index} offer={offer} onSelect={handleOfferSelect} />
              ))}
          </div>
        ) : (
          <FormProvider {...methods}>
            <Form
              title='Customize your card'
              step={1}
              onSubmit={handleSubmit(onSubmit)}
              amount={amount}
              setAmount={setAmount}
            >
              {isLoading ? (
                <div className='customize-card__loader'>
                  <Loader />
                </div>
              ) : (
                <>
                  <h2 className='customize-card__title'>Contact Information</h2>
                  <div className='customize-card__fields'>
                    <div className='customize-card__field'>
                      <label className='input-field__label' htmlFor='lastName'>
                        Your last name <span>*</span>
                      </label>
                      <div className='input-field__input-wrap'>
                        <input
                          id='lastName'
                          {...register('lastName', {
                            required: 'Enter your last name',
                            validate: {
                              notEmpty: (v) => v.trim() !== '' || 'Cannot be empty',
                              minLength: (v) => v.trim().length >= 4,
                              latinOnly: (v) =>
                                /^[A-Za-z'-]+$/.test(v.trim()) || 'Only Latin letters allowed',
                            },
                          })}
                          placeholder='For Example Doe'
                          className={`input-field__input ${errors.lastName ? 'input-field__input--error' : ''}`}
                        />
                        {renderIcon('lastName')}
                      </div>
                      {errors.lastName && (
                        <p className='input-field__error'>{errors.lastName.message}</p>
                      )}
                    </div>

                    <div className='customize-card__field'>
                      <label className='input-field__label' htmlFor='firstName'>
                        Your first name <span>*</span>
                      </label>
                      <div className='input-field__input-wrap'>
                        <input
                          id='firstName'
                          {...register('firstName', {
                            required: 'Enter your first name',
                            validate: {
                              notEmpty: (v) => v.trim() !== '' || 'Cannot be empty',
                              minLength: (v) => v.trim().length >= 4,
                              latinOnly: (v) =>
                                /^[A-Za-z'-]+$/.test(v.trim()) || 'Only Latin letters allowed',
                            },
                          })}
                          placeholder='For Example John'
                          className={`input-field__input ${errors.firstName ? 'input-field__input--error' : ''}`}
                        />
                        {renderIcon('firstName')}
                      </div>
                      {errors.firstName && (
                        <p className='input-field__error'>{errors.firstName.message}</p>
                      )}
                    </div>

                    <div className='customize-card__field'>
                      <label className='input-field__label' htmlFor='patronymic'>
                        Your patronymic
                      </label>
                      <div className='input-field__input-wrap'>
                        <input
                          id='patronymic'
                          {...register('patronymic', {
                            validate: (value) => {
                              const v = (value || '').trim();

                              if (v === '') return true;
                              if (v.length < 4) return 'Minimum 4 characters';
                              if (!/^[A-Za-z'-]+$/.test(v)) return 'Only Latin letters allowed';

                              return true;
                            },
                          })}
                          placeholder='For Example Victorovich'
                          className={`input-field__input ${errors.patronymic ? 'input-field__input--error' : ''}`}
                        />
                        {renderIcon('patronymic')}
                      </div>
                      {errors.patronymic && (
                        <p className='input-field__error'>{errors.patronymic.message}</p>
                      )}
                    </div>

                    <div className='customize-card__field'>
                      <label className='input-field__label' htmlFor='term'>
                        Select term <span>*</span>
                      </label>
                      <div className='input-field__input-wrap'>
                        <select id='term' {...register('term')} className='input-field__input'>
                          <option value='6'>6 month</option>
                          <option value='12'>12 month</option>
                          <option value='18'>18 month</option>
                          <option value='24'>24 month</option>
                        </select>
                      </div>
                    </div>

                    <div className='customize-card__field'>
                      <label className='input-field__label' htmlFor='email'>
                        Your email <span>*</span>
                      </label>
                      <div className='input-field__input-wrap'>
                        <input
                          id='email'
                          {...register('email', {
                            required: 'Email required',
                            pattern: {
                              value: /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/,
                              message: 'Incorrect email address',
                            },
                          })}
                          placeholder='test@gmail.com'
                          className={`input-field__input ${errors.email ? 'input-field__input--error' : ''}`}
                        />
                        {renderIcon('email')}
                      </div>
                      {errors.email && (
                        <p className='input-field__error'>Incorrect email address</p>
                      )}
                    </div>

                    <div className='customize-card__field'>
                      <label className='input-field__label' htmlFor='birth'>
                        Your date of birth <span>*</span>
                      </label>
                      <div className='input-field__input-wrap'>
                        <input
                          id='birth'
                          type={dateInputType}
                          onFocus={() => setDateInputType('date')}
                          placeholder='Select Date and Time'
                          min={getMinBirthdate()}
                          max={getMaxBirthdate()}
                          {...register('birth', {
                            required: 'Date is required',
                            validate: (v) => {
                              const date = new Date(v);
                              if (isNaN(date.getTime())) return 'Invalid date';

                              const now = new Date();
                              const birthYear = date.getFullYear();
                              const currentYear = now.getFullYear();

                              const age = currentYear - birthYear;

                              if (age < 18) return 'You must be at least 18 years old';
                              if (age > 75) return 'You must be younger than 75 years old';

                              return true;
                            },
                          })}
                          className={`input-field__input ${errors.birth ? 'input-field__input--error' : ''}`}
                        />

                        {renderIcon('birth')}
                      </div>

                      {errors.birth && (
                        <p className='input-field__error'>Incorrect date of birth</p>
                      )}
                    </div>

                    <div className='customize-card__field'>
                      <label className='input-field__label' htmlFor='passportSeries'>
                        Your passport series <span>*</span>
                      </label>
                      <div className='input-field__input-wrap'>
                        <input
                          id='passportSeries'
                          {...register('passportSeries', {
                            required: 'Required',
                            pattern: {
                              value: /^\d{4}$/,
                              message: 'The series must be 4 digits',
                            },
                          })}
                          placeholder='0000'
                          className={`input-field__input ${errors.passportSeries ? 'input-field__input--error' : ''}`}
                        />
                        {renderIcon('passportSeries')}
                      </div>
                      {errors.passportSeries && (
                        <p className='input-field__error'>The series must be 4 digits</p>
                      )}
                    </div>

                    <div className='customize-card__field'>
                      <label className='input-field__label' htmlFor='passportNumber'>
                        Your passport number <span>*</span>
                      </label>
                      <div className='input-field__input-wrap'>
                        <input
                          id='passportNumber'
                          {...register('passportNumber', {
                            required: 'Required',
                            pattern: {
                              value: /^\d{6}$/,
                              message: 'The number must be 6 digits',
                            },
                          })}
                          placeholder='000000'
                          className={`input-field__input ${errors.passportNumber ? 'input-field__input--error' : ''}`}
                        />
                        {renderIcon('passportNumber')}
                      </div>
                      {errors.passportNumber && (
                        <p className='input-field__error'>The series must be 6 digits</p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </Form>
          </FormProvider>
        )}
      </div>
    </section>
  );
});

CustomizeCardForm.displayName = 'CustomizeCardForm';
export default CustomizeCardForm;
