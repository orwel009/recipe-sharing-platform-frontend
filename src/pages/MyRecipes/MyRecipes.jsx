import React, { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";
import "./MyRecipes.css";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fallbackImage = "https://dummyimage.com/400x250/cccccc/000000.png&text=No+Image";

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const res = await api.get("/recipes/my");
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
                  : fallbackImage;

              return { ...recipe, imageUrl };
            } catch (err) {
              console.error(`Error fetching image for ${recipe.title}:`, err);
              return { ...recipe, imageUrl: fallbackImage };
            }
          })
        );

        setRecipes(recipesWithImages);
      } catch (err) {
        console.error(err);
        setError("Failed to load your recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchMyRecipes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    try {
      await api.delete(`/recipes/${id}`);
      setRecipes(recipes.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete recipe");
    }
  };

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
              <div className="recipe-img">
                <img
                  src={recipe.imageUrl || fallbackImage}
                  alt={recipe.title}
                  style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "10px" }}
                />
              </div>

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
                <button
                  onClick={() => handleDelete(recipe._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRecipes;