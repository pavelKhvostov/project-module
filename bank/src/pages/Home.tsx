import React from 'react';

import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Map from '@/components/Map';
import News from '@/components/News';
import Support from '@/components/Support';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Services />
      <Map />
      <News />
      <Support />
    </>
  );
};

export default Home;
