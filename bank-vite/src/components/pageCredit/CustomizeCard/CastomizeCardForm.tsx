import React, { useState, forwardRef } from 'react';
import './_castomizeCardForm.scss';
import Form from '@/components/ui/FormComponent.tsx/Form';
import errorSvg from '@/assets/img/Close_round_fill.svg';
import checkSvg from '@/assets/img/Check_fill.svg';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import Loader from '@/components/ui/Loader/Loader';

interface FormValues {
  lastName: string;
  firstName: string;
  patronymic?: string;
  term: string;
  email: string;
  birth: string;
  passportSeries: string;
  passportNumber: string;
}

interface ApplicationPayload {
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

const CustomizeCardForm = forwardRef<HTMLDivElement>((_, ref) => {
  const [dateInputType, setDateInputType] = useState<'text' | 'date'>('text');
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState<number>(150000);

  const methods = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: {
      term: '6',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = methods;

  const renderIcon = (fieldName: keyof FormValues) => {
    const value = watch(fieldName)?.toString().trim();
    if (errors[fieldName]) {
      return <img src={errorSvg} alt='error' className='customize-card__input-icon' />;
    }
    if (value) {
      return <img src={checkSvg} alt='valid' className='customize-card__input-icon' />;
    }
    return null;
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);

    console.log(data.firstName.trim());

    const payload: ApplicationPayload = {
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

      console.log(response.data);
    } catch (error) {
      console.error('Submit failed:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className='customize-card' ref={ref}>
      <div className='container'>
        <FormProvider {...methods}>
          <Form step={1} onSubmit={handleSubmit(onSubmit)} amount={amount} setAmount={setAmount}>
            {isLoading ? (
              <div className='customize-card__loader'>
                <Loader />
              </div>
            ) : (
              <>
                <h2 className='customize-card__title'>Contact Information</h2>
                <div className='customize-card__fields'>
                  <div className='customize-card__field'>
                    <label className='customize-card__label' htmlFor='lastName'>
                      Your last name <span>*</span>
                    </label>
                    <div className='customize-card__input-wrap'>
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
                        className={`customize-card__input ${errors.lastName ? 'customize-card__input--error' : ''}`}
                      />
                      {renderIcon('lastName')}
                    </div>
                    {errors.lastName && (
                      <p className='customize-card__error'>{errors.lastName.message}</p>
                    )}
                  </div>

                  <div className='customize-card__field'>
                    <label className='customize-card__label' htmlFor='firstName'>
                      Your first name <span>*</span>
                    </label>
                    <div className='customize-card__input-wrap'>
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
                        className={`customize-card__input ${errors.firstName ? 'customize-card__input--error' : ''}`}
                      />
                      {renderIcon('firstName')}
                    </div>
                    {errors.firstName && (
                      <p className='customize-card__error'>{errors.firstName.message}</p>
                    )}
                  </div>

                  <div className='customize-card__field'>
                    <label className='customize-card__label' htmlFor='patronymic'>
                      Your patronymic
                    </label>
                    <div className='customize-card__input-wrap'>
                      <input
                        id='patronymic'
                        {...register('patronymic')}
                        placeholder='For Example Victorovich'
                        className='customize-card__input'
                      />
                    </div>
                  </div>

                  <div className='customize-card__field'>
                    <label className='customize-card__label' htmlFor='term'>
                      Select term <span>*</span>
                    </label>
                    <div className='customize-card__input-wrap'>
                      <select id='term' {...register('term')} className='customize-card__input'>
                        <option value='6'>6 month</option>
                        <option value='12'>12 month</option>
                        <option value='18'>18 month</option>
                        <option value='24'>24 month</option>
                      </select>
                    </div>
                  </div>

                  <div className='customize-card__field'>
                    <label className='customize-card__label' htmlFor='email'>
                      Your email <span>*</span>
                    </label>
                    <div className='customize-card__input-wrap'>
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
                        className={`customize-card__input ${errors.email ? 'customize-card__input--error' : ''}`}
                      />
                      {renderIcon('email')}
                    </div>
                    {errors.email && (
                      <p className='customize-card__error'>Incorrect email address</p>
                    )}
                  </div>

                  <div className='customize-card__field'>
                    <label className='customize-card__label' htmlFor='birth'>
                      Your date of birth <span>*</span>
                    </label>
                    <div className='customize-card__input-wrap'>
                      <input
                        id='birth'
                        type={dateInputType}
                        onFocus={() => setDateInputType('date')}
                        placeholder='Select Date and Time'
                        {...register('birth', {
                          required: 'Date is required',
                          validate: (v) => {
                            const date = new Date(v);
                            const age = new Date().getFullYear() - date.getFullYear();
                            return age >= 18 || 'Must be 18+';
                          },
                        })}
                        className={`customize-card__input ${errors.birth ? 'customize-card__input--error' : ''}`}
                      />
                      {renderIcon('birth')}
                    </div>
                    {errors.birth && (
                      <p className='customize-card__error'>Incorrect date of birth</p>
                    )}
                  </div>

                  <div className='customize-card__field'>
                    <label className='customize-card__label' htmlFor='passportSeries'>
                      Your passport series <span>*</span>
                    </label>
                    <div className='customize-card__input-wrap'>
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
                        className={`customize-card__input ${errors.passportSeries ? 'customize-card__input--error' : ''}`}
                      />
                      {renderIcon('passportSeries')}
                    </div>
                    {errors.passportSeries && (
                      <p className='customize-card__error'>The series must be 4 digits</p>
                    )}
                  </div>

                  <div className='customize-card__field'>
                    <label className='customize-card__label' htmlFor='passportNumber'>
                      Your passport number <span>*</span>
                    </label>
                    <div className='customize-card__input-wrap'>
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
                        className={`customize-card__input ${errors.passportNumber ? 'customize-card__input--error' : ''}`}
                      />
                      {renderIcon('passportNumber')}
                    </div>
                    {errors.passportNumber && (
                      <p className='customize-card__error'>The series must be 6 digits</p>
                    )}
                  </div>
                </div>
              </>
            )}
          </Form>
        </FormProvider>
      </div>
    </section>
  );
});

CustomizeCardForm.displayName = 'CustomizeCardForm';

export default CustomizeCardForm;
