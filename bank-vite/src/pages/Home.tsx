import React from 'react';

import Hero from '@/components/pageHome/HeroComponent/Hero';
import Services from '@/components/pageHome/ServicesComponent/Services';
import Map from '@/components/pageHome/MapComponent/Map';
import News from '@/components/pageHome/NewsComponent/News';
import Support from '@/components/pageHome/SupportComponent/Support';

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
