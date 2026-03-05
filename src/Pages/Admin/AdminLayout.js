
import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "./AdminLayout.css";
import { assets } from "../assets/assets";
import api from "../../api/axiosConfig";
import { toast } from "react-toastify";
import AdminTopbar from "./adminTopbar";
const AdminLayout = () => {


  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("http://localhost:8080/user/logout", {}, { withCredentials: true });

      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");

      toast.success("Logged out successfully");

      navigate("/");   // redirect to login page
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="admin-containers d-flex" style={{background:" #f8fafc"}}>

        <AdminTopbar></AdminTopbar>
    
      <aside className="admin-sidebar p-3 bg-light">
        <h3>Admin Panel</h3>
        <nav className="nav flex-column mt-4">
            <NavLink to="/admin/dashboard" className="nav-link">
            <img src={assets.dashboardIcon}></img>
            Dashboard</NavLink>
            <NavLink to="/admin/users" className="nav-link">
            <img src={assets.users_icon}></img>
            Manage Users</NavLink>
            <NavLink to="/admin/cars" className="nav-link">
            <img src={assets.carIcon}></img>
            Manage Cars</NavLink>
            <NavLink to="/admin/bookings" className="nav-link">
            <img src={assets.listIcon}></img>
            Manage Bookings</NavLink>

            {/* ✅ Logout Button */}
          <button 
            onClick={handleLogout} 
            className="btn btn-danger mt-4"
          >
            Logout
          </button>

        </nav>
      </aside>

      <main className="admin-main flex-grow-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
