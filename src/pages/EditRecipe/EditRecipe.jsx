import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import "./EditRecipe.css";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await api.get(`/recipes/${id}`);
        const r = res.data;

        setTitle(r.title);
        setIngredients(Array.isArray(r.ingredients) ? r.ingredients.join(", ") : "");
        setInstructions(r.instructions);
      } catch (err) {
        console.error(err);
        setError("Failed to load recipe");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/recipes/${id}`, {
        title,
        ingredients,
        instructions,
      });

      navigate(`/recipes/${id}`); // or navigate("/")
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Update failed");
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="edit-container">
      <h2>Edit Recipe</h2>

      <form className="edit-form" onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Ingredients (comma separated)</label>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        />

        <label>Instructions</label>
        <textarea
          rows="5"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        ></textarea>

        <button type="submit" className="update-btn">
          Update Recipe
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;