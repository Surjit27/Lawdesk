import React from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import PracticeAreas from '../components/PracticeAreas';
import Team from '../components/Team';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <>
      <Hero />
      <Stats />
      <PracticeAreas />
      <Team />
      <Testimonials />
      <Contact />
    </>
  );
};

export default Home;