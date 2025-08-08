import React, { useEffect, useState } from 'react';
import './_application.scss';
import axios from 'axios';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Navigate, useParams } from 'react-router-dom';
import LoanMessage from '../LoanMessag/LoanMessage';
import errorSvg from '@/assets/img/Close_round_fill.svg';
import checkSvg from '@/assets/img/Check_fill.svg';
import Form from '@/components/ui/FormComponent.tsx/Form';

import { useDispatch } from 'react-redux';
import {
  IFormValues,
  resetScoring,
  setScoringData,
  setScoringResult,
  setScoringStatus,
} from '@/redux/slices/scoringSlice';
import { clearOffers } from '@/redux/slices/offerSlices';
import { setStatus, TApplicationStatus } from '@/redux/slices/applicationSlice';

const Application = () => {
  const [dateInputType, setDateInputType] = useState<'text' | 'date'>('text');
  const { applicationId } = useParams();
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [statusId, setStatusId] = useState<TApplicationStatus>('IDLE');

  const dispatch = useDispatch();

  const methods = useForm<IFormValues>();
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
      dispatch(setScoringData(data));
      dispatch(setScoringStatus('PENDING'));

      await axios.put(`http://localhost:8080/application/registration/${applicationId}`, payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      const { data: finalAppData } = await axios.get(
        `http://localhost:8080/admin/application/${applicationId}`,
      );

      if (finalAppData.status === 'CC_DENIED') {
        dispatch(resetScoring());
        dispatch(clearOffers());
        dispatch(setStatus('IDLE'));

        const currentId = Number(applicationId);
        localStorage.removeItem(`reduxState__${currentId}`);

        const rawIds = localStorage.getItem('SelectedAppIds');
        if (rawIds) {
          const ids: number[] = JSON.parse(rawIds).filter((id: number) => id !== currentId);
          localStorage.setItem('SelectedAppIds', JSON.stringify(ids));
        }

        window.location.href = '/';
        return;
      }

      dispatch(setScoringResult(finalAppData));
      dispatch(setStatus('APPROVED'));

      setStatusId('APPROVED');

      dispatch(clearOffers());
      localStorage.removeItem(`Offers_${applicationId}`);

      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      dispatch(setScoringStatus('FAILED'));
    }
  };

  useEffect(() => {
    if (!applicationId) return;

    const raw = localStorage.getItem(`reduxState__${applicationId}`);
    if (raw) {
      const state = JSON.parse(raw);
      const currentStatus: TApplicationStatus = state.application?.status || 'IDLE';
      setStatusId(currentStatus);

      const allowedStatuses: TApplicationStatus[] = [
        'OFFER_SELECTED',
        'WAITING_RESULT',
        'APPROVED',
      ];
      setIsValid(allowedStatuses.includes(currentStatus));
    } else {
      setIsValid(false);
    }
  }, [applicationId, statusId]);

  if (isValid === null) return null;
  if (!isValid) return <Navigate to='*' replace />;

  return (
    <section className='application' data-testid='application-form'>
      <div className='container'>
        {statusId === 'APPROVED' ? (
          <LoanMessage
            title='Wait for a decision on the application'
            text='The answer will come to your mail within 10 minutes'
          />
        ) : (
          <FormProvider {...methods}>
            <Form
              title='Continuation of the application'
              step={2}
              onSubmit={handleSubmit(onSubmit)}
            >
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
                        <option value='FAMALE'>Famale</option>
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
                          required: 'Incorrect date of passport issue date',
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
                          originalBlur && originalBlur(e);
                          if (!e.target.value) setDateInputType('text');
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
                        placeholder='000-000'
                        maxLength={7}
                        {...register('passportIssueBranch', {
                          required: 'The series must be 6 digits',
                          pattern: {
                            value: /^\d{3}-\d{3}$/,
                            message: 'Format must be 123-456',
                          },
                        })}
                        className='input-field__input'
                        onInput={(e: React.FormEvent<HTMLInputElement>) => {
                          let value = e.currentTarget.value.replace(/\D/g, '');

                          if (value.length > 3) {
                            value = value.slice(0, 3) + '-' + value.slice(3, 6);
                          }

                          e.currentTarget.value = value;
                        }}
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
                      Your employment status <span>*</span>
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
                      Your employer INN <span>*</span>
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
                      Your salary <span>*</span>
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
                      Your position<span>*</span>
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
                      Your work experience total <span>*</span>
                    </label>
                    <div className='input-field__input-wrap'>
                      <input
                        type='number'
                        id='workExperienceTotal'
                        placeholder='For example 10'
                        max={99}
                        {...register('workExperienceTotal', {
                          required: 'Enter your work experience total',
                          min: {
                            value: 0,
                            message: 'Value cannot be negative',
                          },
                          max: {
                            value: 99,
                            message: 'Value cannot exceed 99',
                          },
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
                      Your work experience current <span>*</span>
                    </label>
                    <div className='input-field__input-wrap'>
                      <input
                        type='number'
                        id='workExperienceCurrent'
                        placeholder='For example 2'
                        max={99}
                        {...register('workExperienceCurrent', {
                          required: 'Enter your work experience current',
                          min: {
                            value: 0,
                            message: 'Value cannot be negative',
                          },
                          max: {
                            value: 99,
                            message: 'Value cannot exceed 99',
                          },
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
