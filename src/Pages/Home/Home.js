import React from 'react'
import Hero from './Hero'
import CarCard from '../Cars/CarCard';
import FeturedCars from './FeturedCars';
import Banner from './Banner';
import Testimonials from './Testimonials';

import Cars from '../Cars/Cars';


const Home = () => {
  return (
    <div>
      <Hero/>
      <FeturedCars></FeturedCars>
      <Banner></Banner>
      <Testimonials></Testimonials>
      
    </div>
  )
}

export default Home;
