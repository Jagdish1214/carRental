import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const Login = ({ setLoginUser }) => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (state === "register") {
        const response = await api.post(
          "http://localhost:8080/user/register",
          { name, email, password, role }
        );

        console.log(response);
        toast.success("Registration successful!");
        setState("login");
      } else {
        const res = await api.post(
          "http://localhost:8080/user/login",
          { email, password }
        );

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(res.data));

        setLoginUser(res.data);
        toast.success("Login successful!");

        if (res.data.role === "ADMIN") {
          navigate("/admin/dashboard");
        } else {
          navigate("/home");   // ✅ redirect to home
        }
      }

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error.response?.data || "Something went wrong");
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, [setLoginUser]);

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
    >
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column gap-2 p-4 bg-white rounded shadow border"
        style={{ width: "22rem" }}
      >
        <p className="fs-5 fw-medium text-center mb-2">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div>
            <label className="form-label mb-1">Name</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <div>
          <label className="form-label mb-1">Email</label>
          <input
            type="email"
            className="form-control form-control-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="form-label mb-1">Password</label>
          <input
            type="password"
            className="form-control form-control-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {state === "register" && (
          <div>
            <label className="form-label mb-1">Role</label>
            <select
              className="form-select form-select-sm"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
        )}

        {state === "register" ? (
          <p className="small">
            Already have an account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-primary"
              style={{ cursor: "pointer" }}
            >
              click here
            </span>
          </p>
        ) : (
          <p className="small">
            Create an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-primary"
              style={{ cursor: "pointer" }}
            >
              click here
            </span>
          </p>
        )}

        <button type="submit" className="btn btn-primary btn-sm">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;