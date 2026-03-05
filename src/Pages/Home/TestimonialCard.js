import React from 'react';
import './TestimonialCard.css';
import { assets } from '../assets/assets';

const TestimonialCard = ({ image, name, location, testimonial }) => {
  return (
    <div className="testimonial-card">
      <div className="testimonial-content">
        <p className="testimonial-text">"{testimonial}"</p>
      </div>
      <div className="testimonial-user">
        <img src={image} alt={name} className="testimonial-avatar" />
        <div className="testimonial-info">
          <h4 className="testimonial-name">{name}</h4>
          <p className="testimonial-role">{location}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
