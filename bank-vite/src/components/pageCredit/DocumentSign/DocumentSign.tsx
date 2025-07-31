import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Form from '@/components/ui/FormComponent.tsx/Form';
import pdfUrl from '@/assets/pdf/credit-card-offer.pdf';
import fileImg from '@/assets/img/File.svg';
import Button from '@/components/ui/ButtonComponent/Button';
import axios from 'axios';
import './_documentSign.scss';
import LoanMessage from '../LoanMessag/LoanMessage';
import { TApplicationStatus } from '@/redux/slices/applicationSlice';

const DocumentSign = () => {
  const { applicationId } = useParams();
  const [statusId, setStatusId] = useState<TApplicationStatus>('IDLE');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'credit-card-offer.pdf';
    link.click();
  };

  const handleSubmit = async () => {
    if (!applicationId) return;

    try {
      await axios.post(`http://localhost:8080/document/${applicationId}/sign`);
      setStatusId('SIGN_PENDING');

      const key = `reduxState__${applicationId}`;
      const raw = localStorage.getItem(key);
      if (raw) {
        const state = JSON.parse(raw);
        state.application.status = 'SIGN_PENDING';
        localStorage.setItem(key, JSON.stringify(state));
      }
    } catch (error) {
      console.error('Ошибка при подписании документов:', error);
    }
  };

  useEffect(() => {
    if (!applicationId) return;

    const raw = localStorage.getItem(`reduxState__${applicationId}`);
    if (raw) {
      const state = JSON.parse(raw);
      const currentStatus: TApplicationStatus = state.application?.status || 'IDLE';
      setStatusId(currentStatus);

      const allowedStatuses: TApplicationStatus[] = ['DOCS_FORMED', 'SIGN_PENDING'];
      setIsValid(allowedStatuses.includes(currentStatus));
    } else {
      setIsValid(false);
    }
  }, [applicationId]);

  if (isValid === null) return null;
  if (!isValid) return <Navigate to='*' replace />;

  return (
    <>
      {statusId === 'SIGN_PENDING' ? (
        <LoanMessage
          title='Documents have been successfully signed and sent for approval'
          text='Within 10 minutes you will be sent a PIN code to your email for confirmation'
        />
      ) : (
        <section className='sign'>
          <div className='container'>
            <Form className='sign__form' title='Signing of documents' step={4}>
              <p className='sign__text'>
                Information on interest rates under bank deposit agreements with individuals. Center
                for Corporate Information Disclosure. Information of a professional participant in
                the securities market. Information about persons under whose control or significant
                influence the Partner Banks are. By leaving an application, you agree to the
                processing of personal data, obtaining information, obtaining access to a credit
                history, using an analogue of a handwritten signature, an offer, a policy regarding
                the processing of personal data, a form of consent to the processing of personal
                data.
              </p>

              <button type='button' className='sign__card-btn' onClick={handleDownload}>
                <img src={fileImg} alt='иконка файла' /> Information on your card
              </button>

              <div className='sign__actions'>
                <Button className='sign__button' type='button' onClick={handleSubmit}>
                  Send
                </Button>
              </div>
            </Form>
          </div>
        </section>
      )}
    </>
  );
};

export default DocumentSign;
