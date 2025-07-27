import React, { useEffect, useState } from 'react';
import './_application.scss';
import axios from 'axios';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Navigate, useParams } from 'react-router-dom';
import LoanMessage from '../LoanMessag/LoanMessage';
import errorSvg from '@/assets/img/Close_round_fill.svg';
import checkSvg from '@/assets/img/Check_fill.svg';
import Form from '@/components/ui/FormComponent.tsx/Form';

interface IFormValues {
  gender: 'MALE' | 'FAMALE';
  maritalStatus: 'MARRIED' | 'DIVORCED' | 'SINGLE' | 'WIDOW_WIDOWER';
  dependentAmount: number;
  passportIssueDate: string;
  passportIssueBranch: string;
  employmentStatus: 'UNEMPLOYED' | 'SELF_EMPLOYED' | 'EMPLOYED' | 'BUSINESS_OWNER';
  employerINN: string;
  salary: number;
  position: 'WORKER' | 'MID_MANAGER' | 'TOP_MANAGER' | 'OWNER';
  workExperienceTotal: number;
  workExperienceCurrent: number;
}

const clearLocalStorageExcept = (appId: string) => {
  Object.keys(localStorage).forEach((key) => {
    const shouldKeep =
      key === `registrationSubmitted_${appId}` ||
      key === 'SelectedAppId' ||
      key === 'ApplicationHistory' ||
      key.startsWith('ApplicationData_') ||
      key === 'currency_rates_cache' ||
      key === 'isSubscribed' ||
      key === 'subscribedEmail';

    if (!shouldKeep) {
      localStorage.removeItem(key);
    }
  });
};

const Application = () => {
  const [isRegistrationSent, setIsRegistrationSent] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [dateInputType, setDateInputType] = useState<'text' | 'date'>('text');
  const { applicationId } = useParams();

  const methods = useForm<IFormValues>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = methods;

  const renderIcon = (fieldName: keyof IFormValues) => {
    const value = watch(fieldName)?.toString().trim();
    if (errors[fieldName])
      return <img src={errorSvg} alt='error' className='input-field__input-icon' />;
    if (value) return <img src={checkSvg} alt='valid' className='input-field__input-icon' />;
    return null;
  };

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    if (!applicationId) return;

    const payload = {
      gender: data.gender,
      maritalStatus: data.maritalStatus,
      dependentAmount: data.dependentAmount,
      passportIssueDate: data.passportIssueDate,
      passportIssueBranch: data.passportIssueBranch,
      employment: {
        employmentStatus: data.employmentStatus,
        employerINN: data.employerINN,
        salary: data.salary,
        position: data.position,
        workExperienceTotal: data.workExperienceTotal,
        workExperienceCurrent: data.workExperienceCurrent,
      },
    };

    try {
      const { data: appData } = await axios.get(
        `http://localhost:8080/admin/application/${applicationId}`,
      );

      if (appData.status === 'CC_DENIED') {
        localStorage.removeItem(`registrationSubmitted_${applicationId}`);
        window.location.href = `/loan/`;
        return;
      }

      await axios.put(`http://localhost:8080/application/registration/${applicationId}`, payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      localStorage.setItem(`registrationSubmitted_${applicationId}`, 'true');
      localStorage.removeItem('SelectedAppId');
      clearLocalStorageExcept(applicationId);
      setIsRegistrationSent(true);

      const { data: finalAppData } = await axios.get(
        `http://localhost:8080/admin/application/${applicationId}`,
      );
      localStorage.setItem(`ApplicationData_${finalAppData.id}`, JSON.stringify(finalAppData));
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    const savedId = localStorage.getItem('SelectedAppId');
    if (!savedId || savedId !== applicationId) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [applicationId]);

  if (isValid === null) return null;
  if (!isValid) return <Navigate to='*' replace />;

  return (
    <section className='application'>
      <div className='container'>
        {isRegistrationSent ? (
          <LoanMessage />
        ) : (
          <FormProvider {...methods}>
            <Form step={2} onSubmit={handleSubmit(onSubmit)}>
              <div className='application__fields'>
                <div className='application__top'>
                  <div className='application__field'>
                    <label className='input-field__label' htmlFor='gender'>
                      What's your gender <span>*</span>
                    </label>
                    <div className='input-field__input-wrap'>
                      <select
                        id='gender'
                        {...register('gender', { required: 'Select one of the options' })}
                        className='input-field__input'
                      >
                        <option value=''></option>
                        <option value='MALE'>Male</option>
                        <option value='FAMALE'>Female</option>
                      </select>
                    </div>
                    {errors.gender && <p className='input-field__error'>{errors.gender.message}</p>}
                  </div>

                  <div className='application__field'>
                    <label className='input-field__label' htmlFor='maritalStatus'>
                      Your marital status <span>*</span>
                    </label>
                    <div className='input-field__input-wrap'>
                      <select
                        id='maritalStatus'
                        {...register('maritalStatus', { required: 'Select one of the options' })}
                        className='input-field__input'
                      >
                        <option value=''></option>
                        <option value='SINGLE'>Single</option>
                        <option value='MARRIED'>Married</option>
                        <option value='DIVORCED'>Divorced</option>
                        <option value='WIDOW_WIDOWER'>Widow/Widower</option>
                      </select>
                    </div>
                    {errors.maritalStatus && (
                      <p className='input-field__error'>{errors.maritalStatus.message}</p>
                    )}
                  </div>

                  <div className='application__field'>
                    <label className='input-field__label' htmlFor='dependentAmount'>
                      Your number of dependents <span>*</span>
                    </label>
                    <div className='input-field__input-wrap'>
                      <select
                        id='dependentAmount'
                        {...register('dependentAmount', { required: 'Select one of the options' })}
                        className='input-field__input'
                      >
                        <option value=''></option>
                        <option value='0'>0</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4+</option>
                      </select>
                    </div>
                    {errors.dependentAmount && (
                      <p className='input-field__error'>{errors.dependentAmount.message}</p>
                    )}
                  </div>

                  <div className='application__field'>
                    <label className='input-field__label' htmlFor='passportIssueDate'>
                      Date of issue of the passport <span>*</span>
                    </label>
                    <div className='input-field__input-wrap'>
                      <input
                        type={dateInputType}
                        placeholder='Select Date and Time'
                        {...register('passportIssueDate', {
                          required: 'Enter passport issue date',
                          validate: (value) => {
                            const date = new Date(value);
                            const now = new Date();
                            return (
                              (!isNaN(date.getTime()) && date <= now) ||
                              'Incorrect date of passport issue date'
                            );
                          },
                        })}
                        onFocus={() => setDateInputType('date')}
                        onBlur={(e) => {
                          const originalBlur = register('passportIssueDate').onBlur;
                          originalBlur && originalBlur(e); // вызываем встроенный onBlur из react-hook-form
                          if (!e.target.value) setDateInputType('text'); // твоя логика
                        }}
                        className='input-field__input'
                      />
                      {renderIcon('passportIssueDate')}
                    </div>
                    {errors.passportIssueDate && (
                      <p className='input-field__error'>{errors.passportIssueDate.message}</p>
                    )}
                  </div>

                  <div className='application__field'>
                    <label className='input-field__label' htmlFor='passportIssueBranch'>
                      Division code <span>*</span>
                    </label>
                    <div className='input-field__input-wrap'>
                      <input
                        type='text'
                        id='passportIssueBranch'
                        placeholder='000000'
                        {...register('passportIssueBranch', {
                          required: 'The series must be 6 digits',
                          pattern: {
                            value: /^\d{3}-\d{3}$/,
                            message: 'Format must be 123-456',
                          },
                        })}
                        className='input-field__input'
                      />
                      {renderIcon('passportIssueBranch')}
                    </div>
                    {errors.passportIssueBranch && (
                      <p className='input-field__error'>{errors.passportIssueBranch.message}</p>
                    )}
                  </div>
                </div>

                <h3 className='application__heading'>Employment</h3>
                <div className='application__bottom'>
                  <div className='application__field'>
                    <label className='input-field__label' htmlFor='employmentStatus'>
                      Employment status <span>*</span>
                    </label>
                    <div className='input-field__input-wrap'>
                      <select
                        id='employmentStatus'
                        {...register('employmentStatus', { required: 'Select one of the options' })}
                        className='input-field__input'
                      >
                        <option value=''></option>
                        <option value='EMPLOYED'>Employed</option>
                        <option value='UNEMPLOYED'>Unemployed</option>
                        <option value='SELF_EMPLOYED'>Self-employed</option>
                        <option value='BUSINESS_OWNER'>Business owner</option>
                      </select>
                    </div>
                    {errors.employmentStatus && (
                      <p className='input-field__error'>{errors.employmentStatus.message}</p>
                    )}
                  </div>

                  <div className='application__field'>
                    <label className='input-field__label' htmlFor='employerINN'>
                      Employer INN <span>*</span>
                    </label>
                    <div className='input-field__input-wrap'>
                      <input
                        type='text'
                        id='employerINN'
                        placeholder='000000000000'
                        {...register('employerINN', {
                          required: 'Department code must be 12 digits',
                          pattern: {
                            value: /^\d{12}$/,
                            message: 'INN must be 12 digits',
                          },
                        })}
                        className='input-field__input'
                      />
                      {renderIcon('employerINN')}
                    </div>
                    {errors.employerINN && (
                      <p className='input-field__error'>{errors.employerINN.message}</p>
                    )}
                  </div>

                  <div className='application__field'>
                    <label className='input-field__label' htmlFor='salary'>
                      Salary <span>*</span>
                    </label>
                    <div className='input-field__input-wrap'>
                      <input
                        type='number'
                        id='salary'
                        placeholder='For example 100 000'
                        {...register('salary', {
                          required: 'Enter your salary',
                          min: {
                            value: 1,
                            message: 'Must be greater than 0',
                          },
                        })}
                        className='input-field__input'
                      />
                      {renderIcon('salary')}
                    </div>
                    {errors.salary && <p className='input-field__error'>{errors.salary.message}</p>}
                  </div>

                  <div className='application__field'>
                    <label className='input-field__label' htmlFor='position'>
                      Position <span>*</span>
                    </label>
                    <div className='input-field__input-wrap'>
                      <select
                        id='position'
                        {...register('position', { required: 'Select one of the options' })}
                        className='input-field__input'
                      >
                        <option value=''></option>
                        <option value='WORKER'>Worker</option>
                        <option value='MID_MANAGER'>Mid Manager</option>
                        <option value='TOP_MANAGER'>Top Manager</option>
                        <option value='OWNER'>Owner</option>
                      </select>
                    </div>
                    {errors.position && (
                      <p className='input-field__error'>{errors.position.message}</p>
                    )}
                  </div>

                  <div className='application__field'>
                    <label className='input-field__label' htmlFor='workExperienceTotal'>
                      Total work experience <span>*</span>
                    </label>
                    <div className='input-field__input-wrap'>
                      <input
                        type='number'
                        id='workExperienceTotal'
                        placeholder='For example 10'
                        max={99}
                        {...register('workExperienceTotal', {
                          required: 'Enter your work experience total',
                          min: 0,
                          max: 99,
                        })}
                        className='input-field__input'
                      />
                      {renderIcon('workExperienceTotal')}
                    </div>
                    {errors.workExperienceTotal && (
                      <p className='input-field__error'>{errors.workExperienceTotal.message}</p>
                    )}
                  </div>

                  <div className='application__field'>
                    <label className='input-field__label' htmlFor='workExperienceCurrent'>
                      Current job experience <span>*</span>
                    </label>
                    <div className='input-field__input-wrap'>
                      <input
                        type='number'
                        id='workExperienceCurrent'
                        placeholder='For example 2'
                        max={99}
                        {...register('workExperienceCurrent', {
                          required: 'Enter your work experience current',
                          min: 0,
                          max: 99,
                        })}
                        className='input-field__input'
                      />
                      {renderIcon('workExperienceCurrent')}
                    </div>
                    {errors.workExperienceCurrent && (
                      <p className='input-field__error'>{errors.workExperienceCurrent.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </Form>
          </FormProvider>
        )}
      </div>
    </section>
  );
};

export default Application;
