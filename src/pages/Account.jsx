import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

export default function Account() {
  const { token, user } = useAuth();

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    async function fetchReservations() {
      try {
        const response = await fetch(`${API}/reservations`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await response.json();
        setReservations(result.reservations);
      } catch {
        setError("Could not load reservations.");
      } finally {
        setLoading(false);
      }
    }

    fetchReservations();
  }, [token]);

  async function handleReturn(reservationId) {
    try {
      const response = await fetch(`${API}/reservations/${reservationId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        setError("Could not return book.");
        return;
      }

      setReservations(reservations.filter((r) => r.id !== reservationId));
    } catch {
      setError("Something went wrong.");
    }
  }

  if (loading) return <p>Loading...</p>;

  if (!token) {
    return (
      <main>
        <h1>Account</h1>
        <p>You need to be logged in to view this page.</p>
        <Link to="/login">Log in</Link>
        <Link to="/register">Register</Link>
      </main>
    );
  }

  return (
    <main>
      <h1>Account</h1>

      {user && (
        <section>
          <h2>
            {user.firstname} {user.lastname}
          </h2>
          <p>{user.email}</p>
        </section>
      )}

      <section>
        <h2>My Reservations</h2>

        {error && <p>{error}</p>}

        {reservations.length === 0 ? (
          <p>You have no reservations.</p>
        ) : (
          <ul>
            {reservations.map((reservation) => (
              <li key={reservation.id}>
                <img
                  src={reservation.book.coverimage}
                  alt={reservation.book.title}
                />
                <p>{reservation.book.title}</p>
                <p>{reservation.book.author}</p>
                <button onClick={() => handleReturn(reservation.id)}>
                  Return
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
