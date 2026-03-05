// src/Pages/Admin/ManageAllCars.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import { toast } from "react-toastify";
import "./ManageAllCars.css";

const ManageAllCars = () => {
  const [cars, setCars] = useState([]);

  // Fetch all cars
  const fetchCars = async () => {
    try {
      const res = await api.get("/admin/cars", { withCredentials: true });
      setCars(res.data);
    } catch (err) {
      toast.error("Failed to fetch cars");
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Toggle car availability
  const toggleCarStatus = async () => {
    try {
      await api.put(`/admin/cars`, {}, { withCredentials: true });
      toast.success("Car status updated");
      fetchCars(); // Refresh list
    } catch (err) {
      toast.error("Failed to update car status");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this car?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(
        `http://localhost:8080/admin/cars/${id}`,
        { withCredentials: true }
      );

      toast.success("Car deleted successfully");
      fetchCars(); // refresh list
    } catch (error) {
      toast.error("Failed to delete car");
    }
  };


  return (
    <div className="manage-cars-container">
      <h1 className="title ms-1">Manage All Cars</h1>

      <div className="card shadow-sm p-3">
        <table className="table table-hover table-bordered text-center">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cars.length > 0 ? (
              cars.map((car) => (
                <tr key={car.id}>
                  <td>{car.id}</td>
                  <td>{car.brand}</td>
                  <td>{car.model}</td>
                  <td>{car.ownerName}</td>
                  <td>{car.isAvailable ? "Available" : "Disabled"}</td>
                  <td>
                   <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(car.id)}
                        >
                          Delete
                        </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No cars found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAllCars;
