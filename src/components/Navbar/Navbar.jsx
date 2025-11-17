import React, { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-nav">
      <div className="container">
        <a className="navbar-brand brand-text" href="/">
          🍽️ RecipeHub
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav gap-3">

            <li className="nav-item">
              <a className="nav-link nav-link-custom" href="/">Home</a>
            </li>

            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <a className="nav-link nav-link-custom" href="/my-recipes">My Recipes</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link nav-link-custom" href="/add-recipes">Add Recipe</a>
                </li>

                <li className="nav-item">
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}

            {!isAuthenticated && (
              <li className="nav-item">
                <a className="login-btn" href="/login">Login</a>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;