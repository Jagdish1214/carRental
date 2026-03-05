import React, { useEffect, useState } from 'react'
import "./Cars.css";
import { assets, dummyCarData } from '../assets/assets';
import CarCard from './CarCard';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';

const Cars = () => {

  const navigate = useNavigate();

  const [input,setInput]=useState('');

  const [cars, setCars] = useState([]);

  const location = useLocation();


  useEffect(() => {
  if (location.state?.cars) {
    setCars(location.state.cars);
  } else {
    fetchCars();
  }
}, [location.state]);



  const fetchCars = async () => {
    try {
      const res = await api.get("http://localhost:8080/cars/allcars");
      console.log("CARS 👉", res.data);
      setCars(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async () => {
    if (!input.trim()) {
      fetchCars();
      return;
    }

    try {
      const res = await api.get(
        `http://localhost:8080/cars/search?keyword=${input}`
      );
      setCars(res.data);
    } catch (err) {
      console.error(err);
    }
  };




  return (
    <div style={{marginTop:"90px"}} className='carsmain-div'>
      <div className='section1'>
        <div className='title'>
            <h1>Available Cars</h1>
            <p>Browse our selection of premium vehicles available for your next adventure</p>
        </div>
        <div className='search-bar'>
          <div className="search-input-wrapper">
            <img src={assets.search_icon} className="search-icon" alt="Search" />
            <input onChange={(e)=>setInput(e.target.value)} value={input} type='text' placeholder="Search any keyword...
              " />
              
              <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>
      <div className='section2  px-5'>
        <div className='carlength'>

          <p>Showing {cars.length} Cars</p>
        </div>
        <div className='available-cars' >
          <div className="row">
            {cars.slice(0, 9).map((c) => (
            <div key={c.id} onClick={() => navigate(`/cars/car-details/${c.id}`,{ replace: true })} className="col-sm-12 col-md-6 col-lg-4 mb-4">
                <CarCard c={c} />
            </div>
            ))}
        </div>
        </div>
      </div>
    </div>
  )
}

export default Cars;
