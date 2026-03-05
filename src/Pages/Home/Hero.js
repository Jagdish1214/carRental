import React, { useState } from 'react'
import { assets, citylist } from '../assets/assets';
import "./hero.css";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axiosConfig';

const Hero = () => {
    const [pickupLoc, setPickupLoc] = useState("");
    const [pickupDate, setPickupDate] = useState("");
    const [returnDate, setReturnDate] = useState("");

    const today = new Date().toISOString().split("T")[0];

    const navigate=useNavigate();

    const getMinPickupDate = () => {
        return today;
    };

    const getMinReturnDate = () => {
    if (!pickupDate) return "";

    const date = new Date(pickupDate);
    date.setDate(date.getDate() + 2);

    return date.toISOString().split("T")[0];
    };

        const handleSearch = async (e) => {
        e.preventDefault();

        if (!pickupLoc || !pickupDate || !returnDate) {
        toast.error("Please fill all fields");
        return;
        }

        try {
        const res = await api.get("http://localhost:8080/cars/Search", {
                params: {
            location: pickupLoc,
            pickupDate,
            returnDate,
            },
        });

        // Navigate and pass data
        navigate("/cars", {
            state: {
            cars: res.data,
            pickupLoc,
            pickupDate,
            returnDate,
            },
        });

        } catch (error) {
        toast.error("No cars available");
        }
    };



return (
    <div >
        <div className='hero-section'>
            
            <div className='hero-text'>
            <h1>Get cars on Rent</h1>
            </div>

            <div className='form'>
            <form className='form-container' onSubmit={handleSearch}>
                <div className='row'>
                    <div className='form-group col-sm-3'>
                        <select required value={pickupLoc} onChange={(e)=>setPickupLoc(e.target.value)}>
                            <option value="">Pickup Location</option>
                            {citylist.map((city)=><option key={city} value={city}>{city}</option>)}
                        </select>
                        <p>{pickupLoc? pickupLoc:'Please select location'}</p>
                    </div>
                   <div className='form-group col-sm-3'>
                        <label htmlFor="pickup-date">Pick-up Date</label>
                        <input type='date' id='pickup-date'value={pickupDate} min={getMinPickupDate()} onChange={(e) => setPickupDate(e.target.value)} required/>
                    </div>
                    <div className='form-group col-sm-3'>
                        <label htmlFor="return-date">Return Date</label>
                        <input type='date' id='return-date'value={returnDate} min={getMinReturnDate()} onChange={(e) => setReturnDate(e.target.value)} required/>
                    </div>
                    <div className='form-group col-sm-3'>
                    <button type='submit' className='btn btn-primary text-white d-flex align-items-center gap-1'>
                        <img src={assets.search_icon} alt='SearchIcon' className='search-icon'></img>
                        <span style={{color:"white"}}>Search</span>
                    </button>
                    </div>

                </div>

            </form>
            </div>
            <div className='hero-image'>
            <img src={assets.mainicon} alt='mainicon' ></img>
            </div>
        </div>
    </div>
    )
}

export default Hero;
