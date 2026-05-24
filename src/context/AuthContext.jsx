import { createContext, useState, useEffect, useContext } from "react";

const API = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      fetchUser(savedToken);
    }
  }, []);

  async function fetchUser(token) {
    const response = await fetch(`${API}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await response.json();
    setUser(result);
  }

  async function login(newToken) {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    await fetchUser(newToken);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
