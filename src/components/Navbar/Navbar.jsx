import React from "react";
import "./Navbar.css";

const Navbar = () => {
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
            <li className="nav-item">
              <a className="nav-link nav-link-custom" href="/recipes">Recipes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-link-custom" href="/add">Add Recipe</a>
            </li>
            <li className="nav-item">
              <a className="login-btn" href="/login">Login</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;