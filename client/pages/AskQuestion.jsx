import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AskQuestion() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to ask a question.");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/questions", { title, description }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Question posted!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to post question.");
    }
  };

  return (
    <div>
      <h2>Ask a Question</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required /><br />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AskQuestion;
