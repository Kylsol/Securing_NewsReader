import { Link, useLocation } from "react-router-dom";
import { useArticles } from "../context/ArticlesContext";
import { useAuth } from "../context/AuthContext";

function Navigation() {
  const location = useLocation();

  const { getUserSavedArticles } = useArticles();
  const savedCount = getUserSavedArticles().length;
  const { user, logout, isAuthenticated, isAdmin } = useAuth();

  return (
    <nav>
      <div className="nav-container">
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <h1 className="nav-brand">NewsReader</h1>

          <div className="nav-links">
            <Link
              to="/"
              className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
            >
              Home
            </Link>

            <Link
              to="/search"
              className={`nav-link ${location.pathname === "/search" ? "active" : ""}`}
            >
              Search
            </Link>

            <Link
              to="/saved"
              className={`nav-link ${location.pathname === "/saved" ? "active" : ""}`}
            >
              Saved Articles ({savedCount})
            </Link>

            {isAuthenticated() && isAdmin() && (
              <Link
                to="/admin"
                className={`nav-link ${location.pathname === "/admin" ? "active" : ""}`}
              >
                Admin
              </Link>
            )}
          </div>
        </div>

        <div className="nav-user">
          {isAuthenticated() ? (
            <>
              <span style={{ marginRight: "12px" }}>{user.username}</span>

            {isAdmin() && (
              <Link
                to="/admin"
                className={`nav-link ${location.pathname === "/admin" ? "active" : ""}`}
                style={{ marginRight: "12px" }}
              >
                Admin
              </Link>
            )}

            <button
              onClick={logout}
              className="nav-link"
              style={{ border: "none", background: "none", cursor: "pointer" }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className={`nav-link ${location.pathname === "/login" ? "active" : ""}`}
          >
            Login
          </Link>
        )}
      </div>
    </div>
  </nav>
  );
}

export default Navigation;