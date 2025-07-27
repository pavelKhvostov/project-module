import React from 'react';
import offerImg from '@/assets/img/offer.png';
import Button from '@/components/ui/ButtonComponent/Button';
import './_offerCard.scss';
import checkImg from '@/assets/img/Check_fill.svg';
import closeImg from '@/assets/img/Close_round_fill.svg';
import axios from 'axios';

interface IOffer {
  applicationId: number;
  isInsuranceEnabled: boolean;
  isSalaryClient: boolean;
  monthlyPayment: number;
  rate: number;
  requestedAmount: number;
  term: number;
  totalAmount: number;
}

interface IOfferCardProps {
  offer: IOffer;
  onSelect: (applicationId: number) => void;
}

const OfferCard: React.FC<IOfferCardProps> = ({ offer, onSelect }) => {
  return (
    <div className='offer-card'>
      <img
        className='offer-card__img'
        src={offerImg}
        width={150}
        height={150}
        alt='коробка с конфетти'
      />
      <div className='offer-card__wrap'>
        <span className='offer-card__text'>
          Requested amount: {offer.requestedAmount.toLocaleString()} ₽
        </span>
        <span className='offer-card__text'>
          Total amount: {offer.totalAmount.toLocaleString()} ₽
        </span>
        <span className='offer-card__text'>For {offer.term} months</span>
        <span className='offer-card__text'>
          Monthly payment:{' '}
          {offer.monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })} ₽
        </span>
        <span className='offer-card__text'>Your rate: {offer.rate}%</span>
        <span className='offer-card__text'>
          {offer.isInsuranceEnabled ? 'Insurance included' : 'No insurance'}
          <img
            src={offer.isInsuranceEnabled ? checkImg : closeImg}
            alt='картика галочки или крестика'
          />
        </span>
        <span className='offer-card__text'>
          {offer.isSalaryClient ? 'Salary client' : 'Not a salary client'}
          <img
            src={offer.isSalaryClient ? checkImg : closeImg}
            alt='картика галочки или крестика'
          />
        </span>
      </div>
      <Button
        className='offer-card__btn'
        children='Select'
        type='button'
        onClick={() => onSelect(offer.applicationId)}
      />
    </div>
  );
};

export default OfferCard;
