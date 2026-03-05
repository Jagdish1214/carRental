import React from 'react'
import { assets } from '../assets/assets'
import './Banner.css';

const Banner = () => {
    return (
        <div className='banner-container'>
            <div  className='banner-content'>
                <h2>Do You Own a Car?</h2>
                <p>Monetize your vehicle effortlessly by listing it on CarRental.</p>
                <p>We take care of insurance, driver verification and secure payments — so you can earn passive income, stress-free.</p>
                <button>List your car</button>
            </div>
            <img src={assets.banner_car_image} alt='car' className="banner-image"></img>
        </div>
    )
}

export default Banner
