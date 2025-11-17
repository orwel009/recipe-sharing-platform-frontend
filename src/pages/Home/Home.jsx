import React, { useEffect, useState } from "react";
import api from "../../api";
import "./Home.css";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    try {
      const res = await api.get("/recipes");
      const fetchedRecipes = res.data;

      const recipesWithImages = await Promise.all(
        fetchedRecipes.map(async (recipe) => {
          try {
            const title = encodeURIComponent(recipe.title);
            const imgRes = await fetch(
              `https://www.themealdb.com/api/json/v1/1/search.php?s=${title}`
            );
            const data = await imgRes.json();

            const imageUrl =
              data.meals && data.meals.length > 0
                ? data.meals[0].strMealThumb
                : "https://dummyimage.com/400x250/cccccc/000000.png&text=No+Image";

            return { ...recipe, imageUrl };
          } catch (err) {
            console.error(`Error fetching image for ${recipe.title}:`, err);
            return {
              ...recipe,
              imageUrl: "https://dummyimage.com/400x250/cccccc/000000.png&text=No+Image",
            };
          }
        })
      );

      setRecipes(recipesWithImages);
    } catch (err) {
      console.error("Error fetching recipes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="home-container">

      <section className="hero-section d-flex align-items-center">
        <div className="container text-center">
          <h1 className="hero-title">Discover & Share Amazing Recipes</h1>
          <p className="hero-subtitle">
            Explore thousands of recipes from around the world. Cook, save, and enjoy!
          </p>
        </div>
      </section>

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

      <section className="featured-section container">
        <h2 className="section-title">Latest Recipes</h2>

        {loading ? (
          <p className="loading-text">Loading recipes...</p>
        ) : recipes.length === 0 ? (
          <p className="empty-text">No recipes found.</p>
        ) : (
          <div className="row mt-4 g-4">
            {recipes.map((item) => (
              <div className="col-md-6 col-lg-3" key={item._id}>
                <div className="recipe-card">
                  <div className="recipe-img">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "10px" }}
                    />
                  </div>

                  <h3 className="recipe-title">{item.title}</h3>

                  <p className="recipe-desc">
                    {item.instructions.substring(0, 60)}...
                  </p>

                  <a href={`/recipes/${item._id}`} className="recipe-btn">
                    View Recipe
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};

export default Home;