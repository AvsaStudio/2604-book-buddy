import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

export default function Register() {
  const [firstname, serFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [error, SetError] = useState("");

  const { login } = useAuth();
  const navigate = useNaviagte();

  async function nandleSubmit(e) {
    e.prevantDefault();
    SetError("");

    try {
      const response = await fetch(`${API}/users/register`, {
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        SetError(result.message || "Registration failed.");
        return;
      }

      await login(result.token);
      navigate("/account");
    } catch {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <main>
      <h1>Register</h1>

      {error && <p>{error}</p>}

      <form>
        <label>
          First Name
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </label>

        <label>
          Last Name
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </main>
  );
}
