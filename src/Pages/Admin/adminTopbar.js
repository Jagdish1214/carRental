import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const AdminTopbar = () => {
  // Get user directly from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.name || "Owner";

  return (
    <nav className="navbar navbar-light bg-white shadow-sm px-4">
      {/* Left: Brand Logo */}
      <span className="navbar-brand fw-bold text-primary ms-5">
        <Link className="navbar-brand fw-bold" >
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

export default AdminTopbar;
