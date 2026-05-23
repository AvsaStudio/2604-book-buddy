import { BrowserRouter, Router, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Books from "./pages/Books";
import BookDetail from "./pages/Account";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Navbar>
    </BrowserRouter>
  );
}
