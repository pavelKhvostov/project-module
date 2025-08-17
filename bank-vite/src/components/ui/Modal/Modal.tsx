import React from 'react';
import './_modal.scss';
import closeImg from '@/assets/img/CloseModal.svg';

interface IModalProps {
  step: 'confirm' | 'result';
  onClose: () => void;
  onConfirm: () => void;
  onGoHome: () => void;
}

const Modal: React.FC<IModalProps> = ({ step, onClose, onConfirm, onGoHome }) => {
  return (
    <div className='modal' data-testid='deny-modal'>
      <div className='modal__content'>
        <h3 className='modal__title'>Deny application</h3>
        <button className='modal__close' onClick={onClose}>
          <img src={closeImg} alt='Close' />
        </button>
        {step === 'confirm' ? (
          <>
            <p className='modal__text'>You exactly sure, you want to cancel this application?</p>
            <div className='modal__actions'>
              <button className='modal__btn modal__btn--deny' onClick={onConfirm}>
                Deny
              </button>
              <button className='modal__btn modal__btn--cancel' onClick={onClose}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className='modal__text'>Your application has been deny!</p>
            <div className='modal__actions'>
              <button className='modal__btn modal__btn--cancel' onClick={onGoHome}>
                Go home
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
