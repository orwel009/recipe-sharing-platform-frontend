import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">

      {/* HERO SECTION */}
      <section className="hero-section d-flex align-items-center">
        <div className="container text-center">
          <h1 className="hero-title">Discover & Share Amazing Recipes</h1>
          <p className="hero-subtitle">
            Explore thousands of recipes from around the world. Cook, save, and enjoy!
          </p>

          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search recipes..."
              className="search-input"
            />
            <button className="search-btn">Search</button>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories-section container">
        <h2 className="section-title">Popular Categories</h2>

        <div className="row g-3 mt-3">
          {["Breakfast", "Lunch", "Snacks", "Dinner", "Desserts", "Drinks"].map(
            (cat, i) => (
              <div className="col-6 col-md-4 col-lg-2" key={i}>
                <div className="category-card">{cat}</div>
              </div>
            )
          )}
        </div>
      </section>

      {/* FEATURED RECIPES */}
      <section className="featured-section container">
        <h2 className="section-title">Featured Recipes</h2>

        <div className="row mt-4 g-4">
          {[1, 2, 3, 4].map((item) => (
            <div className="col-md-6 col-lg-3" key={item}>
              <div className="recipe-card">
                <div className="recipe-img"></div>
                <h3 className="recipe-title">Delicious Recipe {item}</h3>
                <p className="recipe-desc">
                  A short description of the recipe goes here…
                </p>
                <a href={`/recipes/${item}`} className="recipe-btn">
                  View Recipe
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;