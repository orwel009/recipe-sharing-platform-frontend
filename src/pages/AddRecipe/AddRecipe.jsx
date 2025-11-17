import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./AddRecipe.css";

const AddRecipe = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !ingredients || !instructions) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.post("/recipes", {
        title,
        ingredients,
        instructions,
      });

      navigate(`/recipes/${data._id}`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Failed to add recipe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-recipe-container">
      <div className="add-recipe-card">
        <h2 className="add-title">Add New Recipe</h2>

        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>Recipe Title</label>
          <input
            type="text"
            placeholder="Enter recipe title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Ingredients (comma separated)</label>
          <input
            type="text"
            placeholder="Example: Chicken, Onion, Spices"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />

          <label>Instructions</label>
          <textarea
            placeholder="Write the cooking instructions..."
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Saving..." : "Add Recipe"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;