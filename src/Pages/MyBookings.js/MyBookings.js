  import React, { useEffect, useState } from 'react'
  import { assets} from '../assets/assets';
  import "./MyBookings.css";
  import api from '../../api/axiosConfig';
 import { toast } from "react-toastify";
import PaymentButton from './PaymentButton';

  const MyBookings = () => {
    
    const backendBaseUrl = "http://localhost:8080/uploads/";

    const [Booking,setBooking]=useState([]);

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await api.get(`http://localhost:8080/booking/booking_details`, {
          withCredentials: true,
        });

        const bookingsWithImages = res.data.map(b => ({
          ...b,
          car: b.car ? { ...b.car, imageUrl: b.car.imageUrl ? backendBaseUrl + b.car.imageUrl : "" } : null
        }));

        setBooking(bookingsWithImages);

      } catch (err) {
        toast.error("Car not found");
        
      }
    };

    fetchCar();
  }, [ ]);
    
    return (
      <div className='main-div'>
        <h1 className='title'>MyBookings</h1>
        <p className='subtitle'>View and manage your all car bookings </p>

 <div className="booking-wrapper">
    {Booking.map((booking,index) => (
      <div key={booking.id} className="booking-container">
        
        <div className="row ">
          <div className="col-lg-3 car-img">
            <img src={booking.car?.imageUrl} alt="car" />
            <h5>{booking.car?.brand} {booking.car?.model}</h5>
            
            <h6> {booking.car?.year} • {booking.car?.category}</h6>
            
            </div>
            <div className=' col-lg-3 mt-1 ms-3' >
                <span className="px-3 py-2 bg-light rounded  ">
                    Booking #{index + 1}
                  </span>
              <div >
                <div className='mt-3'>
                  <img src={assets.calendar_icon_colored} className='me-2  '></img>
                  <span >Rental Period</span>
                  <p>{booking.pickupDate.split('T')[0] } To {booking.returnDate.split('T')[0] }</p>
                </div>
              </div>

              <div>
                <div className='mt-3'>
                  <img src={assets.location_icon_colored} className='me-2 loc-img '></img>
                  <span >Pick-up Location</span>
                  <p>{booking.car?.location}</p>
                </div>
              </div>

            </div>

            
            

          
          <div className='col-lg-3 price-details'>
                <span className={` px-3 py-1 small rounded-pill ${ booking.status === "CONFIRMED" ? "bg-success bg-opacity-25 text-success" : booking.status === "PENDING" ? "bg-warning bg-opacity-25 text-warning" : "bg-danger bg-opacity-25 text-danger" }`} > {booking.status} </span>
                <h6 className='mb-1'>Total Price</h6>
                <h3 className='text-primary'>₹{booking.price}</h3>
                <p>Booked on {booking.createdAt?.split('T')[0] } </p>
          </div>
            
          {booking.status === "CONFIRMED" && (
          <div className=" paymentButton ">
            <PaymentButton
              bookingId={booking.bookingId}
              amount={booking.price}
            />
          </div>
        )}


        </div>

      </div>
    ))}
  </div>

      </div>
    )
  }

  export default MyBookings;
