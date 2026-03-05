
import React, { useEffect, useState } from 'react';
import { dummyCarData } from '../assets/assets';
import CarCard from '../Cars/CarCard';
import './FeturedCars.css'; // 👈 Import the CSS file

import { useNavigate} from 'react-router-dom';
import api from '../../api/axiosConfig';

const FeturedCars = () => {
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const res = await api.get("http://localhost:8080/cars/allcars");
            setCars(res.data);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="featured-section container mt-5">
        <div className="text-center mb-4">
            <h2 className="section-title">Featured Vehicles</h2>
            <p className="section-subtitle text-secondary">
            Explore our selection of premium vehicles available for your next adventure.
            </p>
        </div>

        <div className="row">
            {cars.slice(0, 6).map((c) => (
            <div key={c.id} onClick={() => navigate(`/cars`,{replace:true})} className="col-sm-12 col-md-6 col-lg-4 mb-4">
                <CarCard c={c} />
            </div>
            ))}
        </div>
        <div className=" button text-center">
            <button onClick={()=>{navigate('/cars'); window.scrollTo(0,0)}}>Explore all cars →</button>
        </div>

        </div>
    );
    };

export default FeturedCars;

