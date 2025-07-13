import React, { useRef } from 'react';
import CustomizeCardForm from '@/components/pageCredit/CustomizeCard/CastomizeCardForm';
import Hero from '@/components/pageCredit/HeroComponent/Hero';
import StepGetCard from '@/components/pageCredit/StepGetCard/StepGetCard';
import Tab from '@/components/pageCredit/TabComponent/Tab';

const CreditCard: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Hero onApplyClick={handleScrollToForm} />
      <Tab />
      <StepGetCard />
      <CustomizeCardForm ref={formRef} />
    </>
  );
};

export default CreditCard;
