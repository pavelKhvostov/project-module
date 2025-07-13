import CustomizeCardForm from '@/components/pageCredit/CustomizeCard/CastomizeCardForm';
import Hero from '@/components/pageCredit/HeroComponent/Hero';
import StepGetCard from '@/components/pageCredit/StepGetCard/StepGetCard';
import Tab from '@/components/pageCredit/TabComponent/Tab';
import React from 'react';

const CreditCard: React.FC = () => {
  return (
    <>
      <Hero />
      <Tab />
      <StepGetCard />
      <CustomizeCardForm />
    </>
  );
};

export default CreditCard;
