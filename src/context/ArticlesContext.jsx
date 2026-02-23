import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const ArticlesContext = createContext(null);

export function ArticlesProvider({ children }) {
  const { user, isAuthenticated } = useAuth();

  // key = username, value = array of saved articles
  const [savedArticlesByUser, setSavedArticlesByUser] = useState({});

  const getUsername = () => user?.username;

  const getUserSavedArticles = () => {
    if (!isAuthenticated()) return [];
    const username = getUsername();
    return savedArticlesByUser[username] || [];
  };

  const saveArticle = (article) => {
    if (!isAuthenticated()) return;

    const username = getUsername();
    setSavedArticlesByUser((prev) => {
      const current = prev[username] || [];

      if (current.some((a) => a.url === article.url)) return prev;

      return {
        ...prev,
        [username]: [...current, article],
      };
    });
  };

  const removeArticle = (url) => {
    if (!isAuthenticated()) return;

    const username = getUsername();
    setSavedArticlesByUser((prev) => {
      const current = prev[username] || [];
      return {
        ...prev,
        [username]: current.filter((a) => a.url !== url),
      };
    });
  };

  const isArticleSaved = (url) => {
    if (!isAuthenticated()) return false;
    const username = getUsername();
    const current = savedArticlesByUser[username] || [];
    return current.some((a) => a.url === url);
  };

  return (
    <ArticlesContext.Provider
      value={{
        // keep this for now if other components still reference it
        // but we'll switch UI to getUserSavedArticles()
        savedArticles: getUserSavedArticles(),

        savedArticlesByUser,
        getUserSavedArticles,
        saveArticle,
        removeArticle,
        isArticleSaved,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );


}

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (!context) throw new Error("useArticles must be used within ArticlesProvider");
  return context;
};