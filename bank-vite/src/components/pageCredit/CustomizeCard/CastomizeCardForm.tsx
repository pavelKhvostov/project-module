import React from 'react';
import './_castomizeCardForm.scss';
import Form from '@/components/ui/FormComponent.tsx/Form';

const CustomizeCardForm: React.FC = () => {
  return (
    <section className='customize-card'>
      <div className='container'>
        <Form step={1}>сcard</Form>
      </div>
    </section>
  );
};

export default CustomizeCardForm;
