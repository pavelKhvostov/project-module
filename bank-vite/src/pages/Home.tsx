import React from 'react';

import Hero from '@/components/HeroComponent/Hero';
import Services from '@/components/ServicesComponent/Services';
import Map from '@/components/MapComponent/Map';
import News from '@/components/NewsComponent/News';
import Support from '@/components/SupportComponent/Support';

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
