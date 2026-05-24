import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

export default function BookDetails() {
  const { id } = useParams();
  const { token } = useAuth();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await fetch(`${API}/books/${id}`);
        const result = await response.json();
        setBook(result);
      } catch {
        setError("Could not load book.");
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [id]);

  async function handleReserve() {
    try {
      const response = await fetch(`${API}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId: id }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Could not reserve book.");
        return;
      }

      setBook({ ...book, available: false });
    } catch {
      setError("Something went wrong.");
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <main>
      <img src={book.coverimage} alt={book.title} />
      <h1>{book.title}</h1>
      <h2>{book.author}</h2>
      <p>{book.description}</p>

      {!token ? (
        <Link to="/login">Log in to reserve</Link>
      ) : book.available ? (
        <button onClick={handleReserve}>Reserve</button>
      ) : (
        <button disabled>Unavailable</button>
      )}
    </main>
  );
}
