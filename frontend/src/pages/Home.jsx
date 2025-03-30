import React from 'react';
import HeroSection from '../components/HeroSection';
import SearchSection from '../components/SearchSection';
import ProductSection from '../components/ProductSection';
import Contact from '../components/Contact';


function Home() {
  return (
    <>
        <HeroSection/>
        <SearchSection/>
        <ProductSection/>
        <Contact/>
    </>
  );
}

export default Home;
