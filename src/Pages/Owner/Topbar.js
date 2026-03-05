import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import api from "../../api/axiosConfig";
const Topbar = () => {
   const [username, setUsername] = useState("Owner");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(
          "http://localhost:8080/user/me",
          { withCredentials: true }
        );
        setUsername(res.data.name);
      } catch (err) {
        console.log("Not logged in");
      }
    };

    fetchUser();
  }, []);

  return (
    <nav className="navbar navbar-light bg-white shadow-sm px-4">
      {/* Left: Brand Logo */}
      <span className="navbar-brand fw-bold text-primary ms-5">
        <Link className="navbar-brand fw-bold" to='/home'>
            <img
            src={assets.brandlogo}
            alt="Logo"
            className="me-2"
            style={{ height: "40px", width: "auto" }}
          />
            UrbanRentals
          </Link>
      </span>

      {/* Right: Welcome User */}
      <span className="fw-medium me-5">
        Welcome, <strong>{username}</strong>
      </span>
    </nav>
  );
};

export default Topbar;
