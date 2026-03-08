import React, { useEffect, useState } from "react";

import "./dashboard.css";
import { assets } from "../assets/assets";
import api from "../../api/axiosConfig";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const AdminDashboard = () => {

   

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const chartData =
    data?.monthlyRevenue?.length > 0
      ? data.monthlyRevenue
      : [{ month: "No Data", revenue: 0 }];

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await api.get(
                    "http://localhost:8080/owner/dashboard_details",
                    { withCredentials: true }
                );
                setData(res.data);
            } catch (err) {
                console.error("Failed to load dashboard");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) {
        return <h3 style={{ marginTop: "120px", textAlign: "center" }}>Loading...</h3>;
    }



    return (
        <div className="admin-layout " style={{marginTop:"80px"}}>

        <div className="main-content">

            <div className="dashboard">
            <h1 >Owner Dashboard</h1>
            <p className="subtitle">
                Monitor overall platform performance including total cars, bookings,
                revenue, and recent activities
            </p>

            {/* Stats */}
            <div className="stats-grid">
                <StatCard title="Total Cars" value={data?.totalCars || 0} icon={assets.carIcon} />

                <StatCard title="Total Bookings"
                value={data?.totalBookings || 0} icon={assets.listIcon} />
                
                <StatCard title="Pending"
                value={data?.pendingBookings || 0} icon={assets.cautionIconColored} />

                <StatCard title="Confirmed"
                value={data?.confirmedBookings || 0} icon={assets.listIcon}/>
            </div>

            {/* Bottom Section */}
            <div className="bottom-grid">
                <div className="card large">
  <h3>Revenue Overview</h3>
  <p className="muted">Revenue trend</p>

  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="revenue"
        stroke="#4CAF50"
        strokeWidth={3}
      />
    </LineChart>
  </ResponsiveContainer>
</div>

                <div className="card revenue">
                <h3>Monthly Revenue</h3>
                <p className="muted">Revenue for current month</p>
                <h1 className="money">₹{data?.totalEarnings || 0}</h1>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

const StatCard = ({ title, value, icon }) => (
    <div className="card stat-card d-flex align-items-center justify-content-between">
    
    {/* Left column */}
    <div className="d-flex flex-column">
        <p className="muted mb-1">{title}</p>
        <h2 className="value mb-0">{value}</h2>
    </div>

    {/* Right column */}
    <div className="icon-circle">
        <img
            src={icon}
            alt={title}
            className="stat-icon"
        />
    </div>

    </div>
);


export default AdminDashboard;
