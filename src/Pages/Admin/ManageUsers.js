// src/Pages/Admin/ManageUsers.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import { toast } from "react-toastify";


const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  // ✅ Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users", {
        withCredentials: true,
      });
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Delete user
  const deleteUser = async (id) => {
    try {
      await api.delete(`/admin/users/${id}`, {
        withCredentials: true,
      });

      toast.success("User deleted successfully");
      fetchUsers();
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="manage-users-container">
      <h1 className="title ms-1">Manage All Users</h1>

      <div className="card shadow-sm p-3">
        <table className="table table-hover table-bordered text-center">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.role === "ADMIN"
                          ? "bg-danger"
                          : user.role === "OWNER"
                          ? "bg-warning text-dark"
                          : "bg-primary"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
