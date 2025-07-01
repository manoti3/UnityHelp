import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/register", { username, email, password });
      alert("Registration successful! You can login now.");
      navigate("/login");
    } catch (err) {
      alert(err.response.data.error || "Registration failed.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required /><br />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
