import React, { useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import './_form-subscribe.scss';

import emailSvg from '@/assets/img/email.svg';
import sendSvg from '@/assets/img/send.svg';

interface SubscribeFormData {
  email: string;
}

const SubscribeForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SubscribeFormData>({
    mode: 'onSubmit',
  });

  const emailValue = watch('email');

  useEffect(() => {
    const saved = localStorage.getItem('isSubscribed');
    const savedEmail = localStorage.getItem('subscribedEmail');
    if (saved === 'true' && savedEmail) {
      setValue('email', savedEmail);
    }
  }, [setValue]);

  const isSubscribed = localStorage.getItem('isSubscribed') === 'true';

  const onSubmit = async (data: SubscribeFormData) => {
    try {
      await axios.post('http://localhost:8080/email', { email: data.email });
      localStorage.setItem('isSubscribed', 'true');
      localStorage.setItem('subscribedEmail', data.email);
      window.location.reload(); // чтобы применилось условие isSubscribed
    } catch (error) {
      console.error('Ошибка при запросе:', error);
      alert('Ошибка при подписке или сервер недоступен');
    }
  };

  return isSubscribed ? (
    <p className='form-subscribe__confirmed'>
      You are already subscribed to the bank&apos;s newsletter.
    </p>
  ) : (
    <form className='form-subscribe' onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className='form-subscribe__wrap-error'>
        <div className='form-subscribe__inner'>
          <img
            className='form-subscribe__icon'
            src={emailSvg}
            width='27'
            height='37'
            alt='изображение письма'
          />
          <input
            type='email'
            className={`form-subscribe__input ${errors.email ? 'form-subscribe__input--error' : ''}`}
            placeholder='Your email'
            {...register('email', {
              required: 'Email required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/,
                message: 'Incorrect email address',
              },
            })}
          />
        </div>
        {errors.email && <p className='form-subscribe__error'>{errors.email.message}</p>}
      </div>

      <button type='submit' className='form-subscribe__btn'>
        <img
          className='form-subscribe__icon'
          src={sendSvg}
          width='27'
          height='29'
          alt='изображение телеграмма'
        />
        <span className='form-subscribe__text'>Subscribe</span>
      </button>
    </form>
  );
};

export default SubscribeForm;
