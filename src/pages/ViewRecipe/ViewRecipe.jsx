import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import "./ViewRecipe.css";

const ViewRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await api.get(`/recipes/${id}`);
        setRecipe(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const deleteRecipe = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/recipes/${id}`);
      navigate("/recipes");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <h2 className="loading-text">Loading...</h2>;

  return (
    <div className="view-container">
      <div className="recipe-card-full">

        <div className="recipe-img-full"></div>

        <h1 className="recipe-title-full">{recipe.title}</h1>

        <p className="recipe-author">
          👨‍🍳 By <strong>{recipe.user?.name}</strong>  
          <span className="recipe-date">
            • {new Date(recipe.createdAt).toLocaleDateString()}
          </span>
        </p>

        <div className="section-block">
          <h3 className="section-title-full">Ingredients</h3>
          <ul className="ingredients-list">
            {recipe.ingredients.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>

        <div className="section-block">
          <h3 className="section-title-full">Instructions</h3>
          <p className="instructions-text">{recipe.instructions}</p>
        </div>

        {userId === recipe.user?._id && (
          <div className="action-buttons">
            <button
              className="edit-btn"
              onClick={() => navigate(`/edit/${recipe._id}`)}
            >
                Edit
            </button>
            <button className="delete-btn" onClick={deleteRecipe}>
                Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewRecipe;