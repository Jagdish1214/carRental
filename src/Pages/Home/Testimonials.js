import React from 'react';
import TestimonialCard from './TestimonialCard';
import { assets } from '../assets/assets';

const testimonials = [
  {
    image: assets.testimonial_image_1,
    name: 'Emma Rodriguez',
    location: 'Barcelona, Spain',
    testimonial: "I've rented cars from various companies, but the experience with CarRental was exceptional."
  },
  {
    image: assets.testimonial_image_2,
    name: 'Ava Johnsonh',
    location: 'New York, USA',
    testimonial: 'CarRental made my trip so much easier. The car was delivered right to my door, and the customer service was fantastic!',
  },

  {
    image: assets.testimonial_image_1,
    name: 'Ava Johnsonh',
    location: 'New York, USA',
    testimonial: "I highly recommend CarRental! Their fleet is amazing, and I always feel like I'm getting the best deal with excellent service.",
  },
];

const Testimonials = () => {
  return (
    <div>
        <div>
            <div className="text-center mb-4">
            <h2 className="section-title" style={{fontSize: "2.2rem",
    fontWeight: "700",
    color:" #1a2238",
    letterSpacing: "1px",
    marginBottom: "0.5rem",
    marginTop:"130px"}}>What Our Customers Say</h2>
            <p className="section-subtitle text-secondary" style={{fontSize: "1.15rem",
    margin: "0 auto",
    maxWidth: "750px",
    lineHeight:" 1.5"}}>
            Discover why discerning travelers choose StayVenture for their luxury accommodations around the world.
            </p>
        </div>
        </div>
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap',marginTop:"70px" }}>
      {testimonials.map((t, index) => (
          <TestimonialCard
          key={index}
            image={t.image}
            name={t.name}
            location={t.location}
            testimonial={t.testimonial}
            />
      ))}
    </div>
    </div>
  );
};

export default Testimonials;
