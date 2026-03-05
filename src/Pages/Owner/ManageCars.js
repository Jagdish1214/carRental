import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./ManageCars.css";

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  

  // Fetch owner's cars
  const fetchCars = async () => {
    try {
      const res = await api.get(
        "http://localhost:8080/cars/owner/my_cars",
        { withCredentials: true }
      );

      setCars(res.data);
    } catch (error) {
      toast.error("Failed to load your cars");
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Delete car
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this car?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(
        `http://localhost:8080/cars/delete-Car/${id}`,
        { withCredentials: true }
      );

      toast.success("Car deleted successfully");
      fetchCars(); // refresh list
    } catch (error) {
      toast.error("Failed to delete car");
    }
  };

  // Edit car
  const handleEdit = (id) => {
  navigate(`/owner/add-car/${id}`);
};

  // Update car availability
const handleStatusChange = async (id, status) => {
  try {
    await api.put(
      `http://localhost:8080/cars/update-carstatus/${id}/status?status=${status}`,
      {},
      { withCredentials: true }
    );

    toast.success("Car status updated");
    fetchCars(); // refresh list
  } catch (error) {
    toast.error("Failed to update status");
  }
};



  return (
    <div className="ManageCarContainer " >

      <div className="tittle ms-1">
        <h1>Manage Cars</h1>
      </div>
      <div className="card shadow-sm p-4 rounded-4 border ">
        <table className="table table-bordered table-hover text-center">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Year</th>
              <th>Daily Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.length > 0 ? (
              cars.map((car) => (
                <tr key={car.id}>
                  <td>{car.id}</td>
                  <td>{car.brand}</td>
                  <td>{car.model}</td>
                  <td>{car.year}</td>
                  <td>₹{car.dailyPrice}</td>
                  <td>
                <select
                  className="form-select form-select-sm"
                  value={car.isAvailable}
                  onChange={(e) =>
                    handleStatusChange(car.id, e.target.value)
                  }
                >
                  <option value={true}>Available</option>
                  <option value={false}>Unavailable</option>
                </select>
              </td>

                  <td>
                    <button
                      className="editbtn"
                      onClick={() => handleEdit(car.id)}
                    >
                      Edit
                    </button>

                    <button
                      className="DeleteBtn"
                      onClick={() => handleDelete(car.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
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

export default ManageCars;
