import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import { toast } from "react-toastify";
import "./AdminDashboard.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const AdminDashboard = () => {
  const [counts, setCounts] = useState({
    users: 0,
    cars: 0,
    bookings: 0,
  });

  const [monthlyEarnings, setMonthlyEarnings] = useState([]);
  const [loading, setLoading] = useState(true);

 const fetchDashboardData = async () => {
  try {
    const [countRes, earningsRes] = await Promise.all([
      api.get("http://localhost:8080/admin/dashboard-count", { withCredentials: true }),
      api.get("http://localhost:8080/admin/admin/monthly-commission", { withCredentials: true }), // ✅ Added this line
    ]);

    setCounts(countRes.data);

    // Ensure earnings is always array
    setMonthlyEarnings(Array.isArray(earningsRes.data) ? earningsRes.data : []);
  } catch (err) {
    toast.error("Failed to load dashboard data");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return <h3 className="text-center mt-5">Loading Dashboard...</h3>;
  }



  return (
    <div className="admin-dashboard container mt-4">
      <h1 className="mb-4">Admin Dashboard</h1>

      {/* KPI Cards */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm p-3 text-center bg-primary text-white rounded">
            <h5>Total Users</h5>
            <h2>{counts.users}</h2>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm p-3 text-center bg-success text-white rounded">
            <h5>Total Cars</h5>
            <h2>{counts.cars}</h2>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm p-3 text-center bg-warning text-white rounded">
            <h5>Total Bookings</h5>
            <h2>{counts.bookings}</h2>
          </div>
        </div>
      </div>

      {/* Monthly Earnings Line Chart */}
      <div className="Earningscard mb-4 p-3 shadow-sm ">
        <h3 className="p-2 ms-5">Monthly Earnings</h3>
        <div style={{ width: "97%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart
              data={monthlyEarnings}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#4caf50"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
