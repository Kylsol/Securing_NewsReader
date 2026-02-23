import React from "react";
import { useArticles } from "../context/ArticlesContext";
import { useAuth } from "../context/AuthContext";

function SavedArticlesPage() {
  const { isAuthenticated } = useAuth();

  // From your updated context
  const { getUserSavedArticles, removeArticle } = useArticles();

  const savedArticles = getUserSavedArticles();

  // If someone somehow lands here without auth (should be blocked by ProtectedRoute)
  if (!isAuthenticated()) {
    return (
      <div style={{ padding: "24px" }}>
        <h1>Saved Articles</h1>
        <p>You must be logged in to view saved articles.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <h1>Saved Articles</h1>

      {savedArticles.length === 0 ? (
        <p>No saved articles yet. Browse articles and click the bookmark icon to save them!</p>
      ) : (
        <div style={{ display: "grid", gap: "12px", marginTop: "16px" }}>
          {savedArticles.map((article) => (
            <div
              key={article.url}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "16px",
              }}
            >
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0 }}>
                  {/* [Assumption] article.title exists */}
                  {article.title || "Untitled Article"}
                </h3>

                {/* These fields vary depending on NYT endpoint */}
                {article.byline && (
                  <p style={{ margin: "6px 0 0 0", opacity: 0.8 }}>
                    {typeof article.byline === "string"
                      ? article.byline
                      : article.byline?.original}
                  </p>
                )}

                {(article.published_date || article.pub_date) && (
                  <p style={{ margin: "6px 0 0 0", opacity: 0.7 }}>
                    {article.published_date || article.pub_date}
                  </p>
                )}

                {article.abstract && (
                  <p style={{ margin: "10px 0 0 0" }}>{article.abstract}</p>
                )}

                {article.url && (
                  <p style={{ margin: "10px 0 0 0" }}>
                    <a href={article.url} target="_blank" rel="noreferrer">
                      Open article
                    </a>
                  </p>
                )}
              </div>

              <button
                onClick={() => removeArticle(article.url)}
                style={{
                  border: "1px solid #ccc",
                  background: "white",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedArticlesPage;