import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ArticlesProvider } from "./context/ArticlesContext";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import SavedArticlesPage from "./pages/SavedArticlesPage";
import AdminPage from "./pages/AdminPage";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ArticlesProvider>
          <Layout>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/login" element={<Login />} />

              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/saved" element={<SavedArticlesPage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Route>
            </Routes>
          </Layout>
        </ArticlesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;