import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="container">

        <div className="row footer-top">
          <div className="col-md-4 text-center text-md-start">
            <h3 className="footer-brand">🍽️ RecipeHub</h3>
            <p className="footer-desc">
              Discover and share amazing recipes from all around the world.
            </p>
          </div>

          <div className="col-md-4 text-center">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/recipes">Recipes</a></li>
              <li><a href="/add">Add Recipe</a></li>
              <li><a href="/login">Login</a></li>
            </ul>
          </div>

          <div className="col-md-4 text-center text-md-end">
            <h5 className="footer-title">Follow Us</h5>
            <div className="social-icons">
              <a href="/"><i className="bi bi-facebook"></i></a>
              <a href="/"><i className="bi bi-instagram"></i></a>
              <a href="/"><i className="bi bi-twitter"></i></a>
              <a href="/"><i className="bi bi-youtube"></i></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} RecipeHub — All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;