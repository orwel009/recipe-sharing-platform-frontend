import React, { useState } from "react";
import api from "../../api";
import "./Auth.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>

        <p>
          Don't have an account?{" "}
          <a href="/signup" className="auth-link">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;