import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Components & Pages
import Navigationbar from "./Pages/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Cars from "./Pages/Cars/Cars";
import MyBookings from "./Pages/MyBookings.js/MyBookings";
import Footer from "./Pages/Footer/Footer";
import Cardetails from "./Pages/Cars/Cardetails";
import Login from "./Pages/Navbar/Login";
import Layout from "./Pages/Owner/Layout";
import Dashboard from "./Pages/Owner/Dashboard";
import AddCar from "./Pages/Owner/AddCar";
import ManageCars from "./Pages/Owner/ManageCars";
import ManageBookings from "./Pages/Owner/ManageBookings";
import AdminLayout from "./Pages/Admin/AdminLayout";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import ManageUsers from "./Pages/Admin/ManageUsers";
import ManageAllCars from "./Pages/Admin/ManageAllCars";
import ManageAllBookings from "./Pages/Admin/ManageAllBookings";

const App = () => {
  const location = useLocation();
  const isOwnerPath = location.pathname.startsWith("/owner");
  const isAdminPath = location.pathname.startsWith("/admin");

  const [LoginUser, setLoginUser] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      setLoginUser(true);
    }
  }, []);

  return (
    <div className="app-container">

      {/* Hide Navbar on login page */}
      {location.pathname !== "/" && !isOwnerPath && !isAdminPath && (
        <Navigationbar
          LoginUser={LoginUser}
          setLoginUser={setLoginUser}
        />
      )}

      <ToastContainer
        position="top-center"
        autoClose={3000}
        icon={true}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        pauseOnHover={false}
        draggable
        theme="light"
      />

      <Routes>
        {/* ✅ Login as default page */}
        <Route path="/" element={<Login setLoginUser={setLoginUser} />} />

        {/* ✅ Home after login */}
        <Route path="/home" element={<Home />} />

        <Route path="/cars" element={<Cars />} />
        <Route
          path="cars/car-details/:id"
          element={<Cardetails LoginUser={LoginUser} />}
        />
        <Route path="/mybookings" element={<MyBookings />} />

        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="/owner/add-car/:id" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="cars" element={<ManageAllCars />} />
          <Route path="bookings" element={<ManageAllBookings />} />
        </Route>
      </Routes>

      {/* Hide Footer on login page */}
      {location.pathname !== "/" && !isOwnerPath && !isAdminPath && (
        <Footer />
      )}
    </div>
  );
};

export default App;