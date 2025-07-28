import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FinalStep from '@/components/pageCredit/FinalStep/FinalStep';
import './_code.scss';
import ellipseImg from '@/assets/img/Ellipse.png';
import Loader from '@/components/ui/Loader/Loader';

const Code = () => {
  const { applicationId } = useParams();
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [values, setValues] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverCode, setServerCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSesCode = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/admin/application/${applicationId}`);
        const code = res.data?.sesCode;
        if (code) {
          setServerCode(String(code));
        } else {
          setError('SES code not found');
        }
      } catch (err) {
        setError('Failed to fetch SES code');
        console.error(err);
      }
    };

    if (applicationId) {
      fetchSesCode();
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
    if (inputCode === serverCode) {
      setIsLoading(true);

      try {
        await axios.post(`http://localhost:8080/document/${applicationId}/sign/code`, inputCode, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        setIsSuccess(true);
      } catch (err) {
        setError('Ошибка при отправке подтверждения');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      setError('Invalid confirmation code');
      setValues(['', '', '', '']);
      inputsRef.current[0]?.focus();
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isSuccess) return <FinalStep />;

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
