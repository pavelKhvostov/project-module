import React from 'react';

import SubscribForm from '@/components/pageHome/SubscribeFormComponents/SubscribeFrom';

import './_support.scss';

const Support: React.FC = () => {
  return (
    <section className='support'>
      <div className='container'>
        <span className='support__text'>Support</span>
        <h2 className='support__title'>Subscribe Newsletter & get</h2>
        <span className='support__text-bottom'>Bank News</span>
        <SubscribForm />
      </div>
    </section>
  );
};
export default Support;
