import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
    return (
        <div className="sidebar text-white p-3">
            <ul className="nav flex-column gap-3 mt-5">
                <li>
                    <NavLink to="/owner/dashboard" className="nav-link text-secondary">
                        <img 
                            src={assets.dashboardIcon}
                            alt="dashboard"
                            style={{marginBottom:"3px"}}
                        /> Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/owner/add-car" className="nav-link text-secondary">
                        <img 
                            src={assets.addIcon}
                            alt="add car"
                            style={{marginBottom:"3px",marginRight:"4px"}}
                        /> Add Car
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/owner/manage-cars" className="nav-link text-secondary">
                        <img 
                            src={assets.carIcon}
                            alt="manage cars"
                            style={{marginBottom:"3px",marginRight:"3px"}}
                        /> Manage Cars
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/owner/manage-bookings" className="nav-link text-secondary">
                        <img 
                            src={assets.listIcon}
                            alt="manage bookings"
                            style={{marginBottom:"3px",marginRight:"3px"}}
                        /> Manage Bookings
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;