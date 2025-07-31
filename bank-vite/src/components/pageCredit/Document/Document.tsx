import React, { useEffect, useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import Form from '@/components/ui/FormComponent.tsx/Form';
import LoanMessage from '@/components/pageCredit/LoanMessag/LoanMessage';
import Checkbox from '@/components/ui/Checkbox/Checkbox';
import Modal from '@/components/ui/Modal/Modal';
import './_document.scss';
import axios from 'axios';
import { TApplicationStatus } from '@/redux/slices/applicationSlice';

type SortDirection = 'asc' | 'desc';
type SortKey =
  | 'number'
  | 'date'
  | 'totalPayment'
  | 'interestPayment'
  | 'debtPayment'
  | 'remainingDebt';

const Document = () => {
  const [statusId, setStatusId] = useState<TApplicationStatus>('IDLE');
  const [isDeleted, setIsDeleted] = useState(false);
  const [agree, setAgree] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>('number');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<'confirm' | 'result'>('confirm');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const navigate = useNavigate();
  const { applicationId } = useParams();

  if (isDeleted) return <Navigate to='/' replace />;

  const rawState = localStorage.getItem(`reduxState__${applicationId}`);
  if (!rawState) return <Navigate to='/' replace />;

  const state = JSON.parse(rawState);
  const schedule = [...(state?.scoring?.result?.credit?.paymentSchedule || [])];

  const sortedSchedule = schedule.sort((a: any, b: any) => {
    const valA = a[sortKey];
    const valB = b[sortKey];
    if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const renderArrow = (key: SortKey) => {
    if (key !== sortKey) return '▲';
    return sortDirection === 'asc' ? '▲' : '▼';
  };

  const handleSend = async () => {
    try {
      await axios.post(`http://localhost:8080/document/${applicationId}`);
      setStatusId('DOCS_FORMED');

      const key = `reduxState__${applicationId}`;
      const raw = localStorage.getItem(key);
      if (raw) {
        const state = JSON.parse(raw);
        state.application.status = 'DOCS_FORMED';
        localStorage.setItem(key, JSON.stringify(state));
      }
    } catch (error) {
      console.error('Ошибка при отправке:', error);
    }
  };

  const handleDeny = () => {
    setIsModalOpen(true);
    setModalStep('confirm');
  };

  const handleModalClose = async () => {
    if (modalStep === 'result' && applicationId) {
      try {
        await axios.post(`http://localhost:8080/application/${applicationId}/deny`);
      } catch (err) {
        console.error('Ошибка при отказе от заявки:', err);
      }

      localStorage.removeItem(`reduxState__${applicationId}`);
      const idsRaw = localStorage.getItem('SelectedAppIds');
      if (idsRaw) {
        const ids = JSON.parse(idsRaw).filter((id: number) => id !== Number(applicationId));
        localStorage.setItem('SelectedAppIds', JSON.stringify(ids));
      }

      setIsDeleted(true);
      navigate('/');
    }

    setIsModalOpen(false);
  };

  const handleConfirmDeny = () => {
    setModalStep('result');
  };

  useEffect(() => {
    if (!applicationId) return;

    const raw = localStorage.getItem(`reduxState__${applicationId}`);
    if (raw) {
      const state = JSON.parse(raw);
      const currentStatus: TApplicationStatus = state.application?.status || 'IDLE';
      setStatusId(currentStatus);

      const allowedStatuses: TApplicationStatus[] = ['WAITING_RESULT', 'APPROVED', 'DOCS_FORMED'];
      setIsValid(allowedStatuses.includes(currentStatus));
    } else {
      setIsValid(false);
    }
  }, [applicationId]);

  if (isValid === null) return null;

  if (!isValid) return <Navigate to='*' replace />;

  return (
    <>
      {statusId === 'DOCS_FORMED' ? (
        <LoanMessage
          title='Documents are formed'
          text='Documents for signing will be sent to your email'
        />
      ) : (
        <section className='document'>
          <div className='container'>
            <Form title='Payment Schedule' step={3}>
              <div className='document__table-wrap'>
                <table className='document__table'>
                  <thead>
                    <tr>
                      <th onClick={() => toggleSort('number')}>Number {renderArrow('number')}</th>
                      <th onClick={() => toggleSort('date')}>Date {renderArrow('date')}</th>
                      <th onClick={() => toggleSort('totalPayment')}>
                        Total payment {renderArrow('totalPayment')}
                      </th>
                      <th onClick={() => toggleSort('interestPayment')}>
                        Interest payment {renderArrow('interestPayment')}
                      </th>
                      <th onClick={() => toggleSort('debtPayment')}>
                        Debt payment {renderArrow('debtPayment')}
                      </th>
                      <th onClick={() => toggleSort('remainingDebt')}>
                        Remaining debt {renderArrow('remainingDebt')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedSchedule.map((item: any, index: number) => (
                      <tr key={index}>
                        <td>{item.number}</td>
                        <td>{new Date(item.date).toLocaleDateString()}</td>
                        <td>{item.totalPayment.toFixed(2)}</td>
                        <td>{item.interestPayment.toFixed(2)}</td>
                        <td>{item.debtPayment.toFixed(2)}</td>
                        <td>{item.remainingDebt.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className='document__footer'>
                <button
                  type='button'
                  className='document__btn document__btn--deny'
                  onClick={handleDeny}
                >
                  Deny
                </button>

                <div className='document__buttons'>
                  <Checkbox
                    checked={agree}
                    onChange={setAgree}
                    label='I agree with the payment schedule'
                  />
                  <button
                    type='button'
                    className='document__btn document__btn--send'
                    onClick={handleSend}
                    disabled={!agree}
                  >
                    Send
                  </button>
                </div>
              </div>
            </Form>
          </div>

          {isModalOpen && (
            <Modal
              step={modalStep}
              onClose={handleModalClose}
              onConfirm={handleConfirmDeny}
              onGoHome={handleModalClose}
            />
          )}
        </section>
      )}
    </>
  );
};

export default Document;
