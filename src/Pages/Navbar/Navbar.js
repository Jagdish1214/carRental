  import React from "react";
  import  { assets } from "../assets/assets";
  import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/axiosConfig";



  const Navigationbar = ({setShowLogin,LoginUser,setLoginUser}) => {
    
    const Navigate=useNavigate();


    

    const handleLogout = async (e) => {
  e.preventDefault();

  try {
    await api.post(
      "http://localhost:8080/user/logout",
      {}
    );

    localStorage.clear()
    setLoginUser(null);
    Navigate("/");
    toast.success("Logged out successfully");
  } catch (error) {
    toast.error("Logout failed");
  }
};



    return (
        <nav className="navbar navbar-expand-lg navbar-dark  ">
        <div className="container">
          <Link className="navbar-brand fw-bold" to='/home'>
            <img
            src={assets.brandlogo}
            alt="Logo"
            className="me-2"
            style={{ height: "40px", width: "auto" }}
          />
            UrbanRentals
          </Link>

          {/* Toggler button */}
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible menu */}
          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav  ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to='/home'>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/cars'>
                  Cars
                </Link>
              </li>
              <li  className="nav-item">
                <Link className="nav-link" to='/mybookings'>
                  MyBookings
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/owner/dashboard'>
                  Dashboard
                </Link>
                
              </li>

              <li className="nav-item">
                {LoginUser ? (
                  <button onClick={handleLogout} className="login-btn mt-1">
                    Logout
                  </button>
                      ) : (
                        <button onClick={()=>Navigate("/")} className="login-btn mt-1">
                    Login
                  </button>
              )}
              
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    );
  };

  export default Navigationbar;
