import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(`${API}/books`);
        const result = await response.json();
        setBooks(result);
      } catch {
        setError("Could not load books.");
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  if (loading) return <p>Loading</p>;
  if (error) return <p>{error}</p>;

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <h1>Catalog</h1>

      <input
        type="text"
        placeholder="Search for a book..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <section>
        {filteredBooks.map((book) => (
          <article key={book.id}>
            <img src={book.coverimage} alt={book.title} />

            <div>
              <Link to={`/books/${book.id}`}>
                <h2>{book.title}</h2>
              </Link>
              <p>{book.author}</p>
              <p>{book.description?.slice(0, 150)}...</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
