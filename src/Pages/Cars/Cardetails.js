import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import api from '../../api/axiosConfig';
import "./Cardetails.css";

const Cardetails = ({ setShowLogin, LoginUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [loading, setLoading] = useState(true);

  const IMAGE_BASE_URL = "http://localhost:8080";

  const today = new Date().toISOString().split("T")[0];

  const getMinPickupDate = () => today;

  const getMinReturnDate = () => {
    if (!pickupDate) return "";
    const date = new Date(pickupDate);
    date.setDate(date.getDate() + 2);
    return date.toISOString().split("T")[0];
  };

  const calculateDays = () => {
    if (!pickupDate || !returnDate) return 0;
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diffTime = end - start;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays > 0 ? diffDays : 0;
  };

  const totalDays = calculateDays();
  const totalPrice = totalDays * (car?.dailyPrice || 0);

  // Fetch car details
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await api.get(`http://localhost:8080/cars/getCar/${id}`, {
          withCredentials: true,
        });
        setCar(res.data);
        console.log("Car Response:", res.data);
      } catch (err) {
        toast.error("Car not found");
        navigate("/cars");
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!LoginUser) {
      toast.warn("Login required to book!");
      setShowLogin(true);
      return;
    }
    if (!pickupDate || !returnDate) {
      toast.error("Please select pickup and return dates");
      return;
    }

    try {
      await api.post(
        "http://localhost:8080/booking/Car_booking",
        {
          carId: car.id,
          pickupDate,
          returnDate,
        },
        { withCredentials: true }
      );
      toast.success("Car booked successfully!");
      navigate("/mybookings");
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  if (!car) return <p className="text-center mt-5">Car not found</p>;

  return (
    <div style={{ marginTop: "70px" }} className='main-div'>
      <button
        type="button"
        className="mt-0 mb-4 d-flex align-items-center gap-2"
        onClick={() => navigate('/cars')}
        style={{ border: "none", outline: "none", background: "white", marginLeft: "110px", color: "grey" }}
      >
        <img
          src={assets.arrow_icon}
          alt="Back Arrow"
          style={{ height: '15px', width: '15px', transform: 'rotate(180deg)', opacity: 0.5 }}
        />
        <span style={{ marginBottom: "5px" }}>Back to all cars</span>
      </button>

      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="row g-3 g-lg-4">

          <div className="col-12 col-lg-8">
            <img
              src={`${IMAGE_BASE_URL}/uploads/${car.imageUrl}`}
              alt="carimage"
              className="img-fluid rounded-xl mb-3 shadow-lg"
              style={{ maxHeight: '350px', objectFit: 'cover', width: '100%', borderRadius: "18px" }}
            />

            <div className='mt-2'>
              <h3 style={{ fontWeight: "bold" }}>{car.brand} {car.model}</h3>
              <h6 style={{ fontWeight: "normal", fontSize: "19px" }} className='text-secondary'>{car.category} • {car.year}</h6>
            </div>

            <hr style={{ marginTop: "36px", width: "98%" }} />

            <div className="row gap-4">
              <div className="col-6 col-md-3 d-flex flex-column justify-content-center align-items-center" style={{ background: "#F1F5F9", height: "75px", width: "136px", borderRadius: "10px" }}>
                <img src={assets.users_icon} alt="users_icon" style={{ width: "25px" }} />
                <p className='mt-1 fw-medium' style={{ fontSize: "14px", marginBottom: "0px" }}>{car.seatingCapacity} Seats</p>
              </div>
              <div className="col-6 col-md-3 d-flex flex-column justify-content-center align-items-center" style={{ background: "#F1F5F9", height: "75px", width: "136px", borderRadius: "10px" }}>
                <img src={assets.fuel_icon} alt="fuel_icon" style={{ width: "25px" }} />
                <p className='mt-1 fw-medium' style={{ fontSize: "14px", marginBottom: "0px" }}>{car.fuelType}</p>
              </div>
              <div className="col-6 col-md-3 d-flex flex-column justify-content-center align-items-center" style={{ background: "#F1F5F9", height: "75px", width: "136px", borderRadius: "10px" }}>
                <img src={assets.car_icon} alt="car_icon" style={{ width: "30px" }} />
                <p className='mt-1 fw-medium' style={{ fontSize: "14px", marginBottom: "0px" }}>{car.transmission}</p>
              </div>
              <div className="col-6 col-md-3 d-flex flex-column justify-content-center align-items-center" style={{ background: "#F1F5F9", height: "75px", width: "136px", borderRadius: "10px" }}>
                <img src={assets.location_icon} alt="location_icon" style={{ width: "20px" }} />
                <p className='mt-1 fw-medium' style={{ fontSize: "14px", marginBottom: "0px" }}>{car.location}</p>
              </div>
            </div>

            <div className='mt-4'>
              <h4>Description</h4>
              <p className='text-secondary mt-3' style={{ fontWeight: 450 }}>{car.description}</p>
            </div>

            <div className='mt-0'>
              <h4 className='mb-3'>Features</h4>
              <div className='row d-flex justify-content-start g-0'>
                {car.features?.split(",").map((item) => (
                  <div key={item} className="col-12 col-md-6 mb-3 d-flex justify-content-start">
                    <div>
                      <img src={assets.check_icon} alt='check_icon' /> {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className='form col-lg-4'>
            <form onSubmit={handleSubmit} className='shadow-lg stick-top'>
              <div className='form-group'>
                <p>₹{car.dailyPrice} <span>per Day</span></p>
                <p>₹{totalPrice} <span>TotalPrice</span></p>
              </div>
              <hr className='mt-4' />
              <div className='form-group'>
                <label htmlFor="pickup-date">Pick-up Date</label>
                <input type='date' id='pickup-date' value={pickupDate} min={getMinPickupDate()} onChange={(e) => setPickupDate(e.target.value)} required />
              </div>
              <div className='form-group'>
                <label htmlFor="return-date">Return Date</label>
                <input type='date' id='return-date' value={returnDate} min={getMinReturnDate()} onChange={(e) => setReturnDate(e.target.value)} required />
              </div>
              <div className='form-group'>
                <button type='submit'><span>Book</span></button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cardetails;
