import CustomizeCardForm from '@/components/pageCredit/CustomizeCard/CastomizeCardForm';
import Hero from '@/components/pageCredit/HeroComponent/Hero';
import StepGetCard from '@/components/pageCredit/StepGetCard/StepGetCard';
import React from 'react';

const CreditCard: React.FC = () => {
  return (
    <>
      <Hero />
      <StepGetCard />
      <CustomizeCardForm />
    </>
  );
};

export default CreditCard;
