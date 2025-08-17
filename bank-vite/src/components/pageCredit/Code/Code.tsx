import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams, Navigate } from 'react-router-dom';
import FinalStep from '@/components/pageCredit/FinalStep/FinalStep';
import './_code.scss';
import ellipseImg from '@/assets/img/Ellipse.png';
import Loader from '@/components/ui/Loader/Loader';
import { TApplicationStatus } from '@/redux/slices/applicationSlice';

const Code = () => {
  const { applicationId } = useParams();
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [values, setValues] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusId, setStatusId] = useState<TApplicationStatus>('IDLE');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (!applicationId) return;

    const raw = localStorage.getItem(`reduxState__${applicationId}`);
    if (!raw) {
      setIsValid(false);
      return;
    }

    const state = JSON.parse(raw);
    const currentStatus: TApplicationStatus = state.application?.status || 'IDLE';
    setStatusId(currentStatus);

    const allowedStatuses: TApplicationStatus[] = ['SIGN_PENDING', 'COMPLETED'];
    setIsValid(allowedStatuses.includes(currentStatus));

    if (currentStatus === 'COMPLETED') {
      setIsSuccess(true);
    }
  }, [applicationId]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const updatedValues = [...values];
    updatedValues[index] = value;
    setValues(updatedValues);

    if (value && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1]?.focus();
    }

    if (updatedValues.every((v) => v !== '')) {
      handleValidation(updatedValues.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !values[index]) {
      const updatedValues = [...values];
      updatedValues[index] = '';
      setValues(updatedValues);
      if (inputsRef.current[index - 1]) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handleValidation = async (inputCode: string) => {
    if (!applicationId) return;

    console.log(inputCode);

    setIsLoading(true);
    try {
      await axios.post(
        `http://localhost:8080/document/${applicationId}/sign/code`,
        Number(inputCode),
        { headers: { 'Content-Type': 'application/json' } },
      );
      setIsSuccess(true);
      setStatusId('COMPLETED');

      const key = `reduxState__${applicationId}`;
      const raw = localStorage.getItem(key);
      if (raw) {
        const state = JSON.parse(raw);
        state.application.status = 'COMPLETED';
        localStorage.setItem(key, JSON.stringify(state));
      }
    } catch (err) {
      setError('Invalid confirmation code');
      setValues(['', '', '', '']);
      inputsRef.current[0]?.focus();
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isValid === null) return null;
  if (!isValid) return <Navigate to='*' replace />;

  if (isLoading) return <Loader />;
  if (isSuccess || statusId === 'COMPLETED') return <FinalStep />;

  return (
    <section className='code'>
      <div className='container'>
        <div className='code__wrap'>
          <h2 className='code__title'>Please enter confirmation code</h2>
          <div className='pin'>
            {[0, 1, 2, 3].map((_, index) => (
              <div className='pin__box' key={index}>
                <input
                  type='text'
                  inputMode='numeric'
                  maxLength={1}
                  className='pin__input'
                  value={values[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => {
                    inputsRef.current[index] = el;
                  }}
                />
                {!values[index] && <img src={ellipseImg} alt='' className='pin__circle' />}
              </div>
            ))}
          </div>
          {error && <p className='pin__error'>{error}</p>}
        </div>
      </div>
    </section>
  );
};

export default Code;
