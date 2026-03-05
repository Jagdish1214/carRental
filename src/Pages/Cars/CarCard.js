import React from "react";
import { Card} from "react-bootstrap";
import "./CarCard.css";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";

const CarCard = ({ c  }) => {
  

  const navigate = useNavigate();

  if (!c) return null;

  return (
    <div className="card-container mt-5"  onClick={()=>{navigate(`car-details/${c.id}`); window.scrollTo(0,0)}}>
      <Card className="car-card shadow-lg">
        <div className="image-wrapper">
          <Card.Img variant="top"
          src={`${api.defaults.baseURL}/uploads/${c.imageUrl}`}

          className="car-image" />
          {c.isAvailable && (
            <span className="available-badge">Available now</span>
          )}
        </div>
        <Card.Body>
          <Card.Title className="car-title">{c.name}</Card.Title>
          <Card.Text className="car-description">
            <div style={{
                  position: "absolute",
                  top: "200px",
                  right: "19px",
                  background: "rgba(34, 34, 35, 0.8)",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  
                  fontSize: "13px",
                  fontWeight: 500,
                }}>
              <span style={{fontSize:"16px", color:"white"}}>₹{c.dailyPrice}</span>
              <span style={{ color:"rgba(182, 182, 183, 0.8)"}}>/ Day</span>
            </div>
              
              <div>
                  <div>
                        <h6 style={{color:"black"}}>{c.brand} {c.model}</h6>
                        <p style={{color:"black"}}>{c.category} • {c.year}</p>
                      </div>
                <div className="row">
                  <div className="form-group col-sm-6">
                      <img src={assets.users_icon} alt="users_icon" style={{ width: "17px" ,marginBottom:"10px"}}></img>
                      <span style={{margin:"10px"}}>{c.seatingCapacity} Seats</span>
                  </div>
                  <div className="form-group col-sm-6 ">
                    <img src={assets.fuel_icon} alt="fuel_icon" style={{ width: "17px" ,marginBottom:"10px"}}></img>
                      <span style={{margin:"10px"}}>{c.fuelType}</span>
                  </div>
                  <div className="form-group col-sm-6 ">
                    <img src={assets.car_icon}  alt="car_icon" style={{ width: "17px" ,marginBottom:"5px"}}></img>
                      <span style={{margin:"10px"}}>{c.transmission}</span>
                  </div>
                  <div className="form-group col-sm-6">
                    <img src={assets.location_icon}  alt="location_icon" style={{ width: "17px" ,marginBottom:"5px"}}></img>
                      <span style={{margin:"10px"}}>{c.location}</span>
                  </div>

                </div>
              </div>

          </Card.Text>
          
        </Card.Body>
      </Card>
    </div>
  );
};

export default CarCard;
