import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import { toast } from "react-toastify";
import "./ManageBookings.css";


const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await api.get("http://localhost:8080/booking/owner/bookings");
      setBookings(res.data);
    } catch (error) {
      toast.error("Failed to load bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

   const updateStatus = async (id, status) => {
    try {
      // ✅ FIXED (send status as request param, not body)
      await api.put(`http://localhost:8080/booking/update/${id}/status?status=${status}`);
      toast.success("Status updated successfully");
      fetchBookings();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const deleteBooking = async (id) => {
    try {
      await api.delete(`http://localhost:8080/booking/delete/booking/${id}`);
      toast.success("Booking deleted");
      fetchBookings();
    } catch (error) {
      toast.error("Failed to delete booking");
    }
  };

  return (
    <div className="ManageBookingscontainer ">


      <div className="tittle">
        <h1>ManageBookings</h1>
      </div>


      <div className="card shadow-sm border-0">


        {/* Card Body */}
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Car</th>
                  <th>Pickup</th>
                  <th>Return</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                  
                </tr>
              </thead>

              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.bookingId}</td>
                      <td>{booking.userName}</td>
                      <td>{booking.carModel}</td>
                      <td>{booking.pickupDate}</td>
                      <td>{booking.returnDate}</td>
                      <td className="fw-bold text-success">
                        ₹{booking.price}
                      </td>
                      

                      <td>
                        <select
                          value={booking.status}
                          onChange={(e) =>
                            updateStatus(booking.bookingId, e.target.value)
                          }
                          className="form-select form-select-sm"
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>

                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteBooking(booking.bookingId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center text-muted">
                      No bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ManageBookings;
