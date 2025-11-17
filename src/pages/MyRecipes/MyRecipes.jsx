import React, { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";
import "./MyRecipes.css";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const res = await api.get("/recipes/my");
        setRecipes(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load your recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchMyRecipes();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="my-recipes-container">
      <h2>My Recipes</h2>

      {recipes.length === 0 ? (
        <p className="no-recipes">You haven’t added any recipes yet.</p>
      ) : (
        <div className="recipes-list">
          {recipes.map((recipe) => (
            <div className="recipe-card" key={recipe._id}>
              <h3>{recipe.title}</h3>

              <p className="small">
                Created: {new Date(recipe.createdAt).toLocaleDateString()}
              </p>

              <div className="buttons">
                <Link to={`/recipes/${recipe._id}`} className="view-btn">
                  View
                </Link>
                <Link to={`/edit/${recipe._id}`} className="edit-btn">
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRecipes;