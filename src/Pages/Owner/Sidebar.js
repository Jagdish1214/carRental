import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
    return (
        <div className="sidebar  text-white p-3">
        <ul className="nav flex-column gap-3 mt-5 ">
            <li>
            <NavLink to="/owner/dashboard" className="nav-link text-secondary">
                <img src={assets.dashboardIcon} 
                style={{marginBottom:"3px"}}
                ></img> Dashboard
            </NavLink>
            </li>
            <li>
            <NavLink to="/owner/add-car" className="nav-link text-secondary">
                <img src={assets.addIcon}
                style={{marginBottom:"3px",marginRight:"4px"}}
                ></img> Add Car
            </NavLink>
            </li>
            <li>
            <NavLink to="/owner/manage-cars" className="nav-link text-secondary">
                <img src={assets.carIcon}
                style={{marginBottom:"3px",marginRight:"3px"}}
                ></img> Manage Cars
            </NavLink>
            </li>
            <li>
            <NavLink to="/owner/manage-bookings" className="nav-link text-secondary">
                <img src={assets.listIcon}
                style={{marginBottom:"3px",marginRight:"3px"}}
                ></img> Manage Bookings
            </NavLink>
            </li>
        </ul>
        </div>
    );
};

export default Sidebar;
