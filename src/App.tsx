// App.tsx (root)
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { api } from "./services/api";
import { User } from "./types";
import Layout from "./components/Layout";

// PUBLIC PAGES
import Home from "./pages/Home";
import Search from "./pages/Search";
import Providers from "./pages/Providers";
import DaycareDetail from "./pages/DaycareDetail";
import RequestTour from "./pages/RequestTour";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import VerifyEmail from "./pages/VerifyEmail";

// ADMIN PAGES
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDaycares from "./pages/admin/AdminDaycares";
import AdminProviders from "./pages/admin/AdminProviders";
import AdminFilters from "./pages/admin/AdminFilters";
import AdminTours from "./pages/admin/AdminTours";
import AdminLogin from "./pages/admin/AdminLogin";

// GLOBAL STATE
import { AppDataProvider } from "./context/AppDataContext";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  // admin login state (separate from parent login)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Load parent user (families)
  useEffect(() => {
    try {
      const currentUser = api.auth.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error("Failed to get current user:", error);
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  // Load admin login state from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("elite_admin_logged_in");
      if (stored === "true") {
        setIsAdminLoggedIn(true);
      }
    } catch (error) {
      console.error("Failed to read admin login state:", error);
    }
  }, []);

  const handleLogout = () => {
    try {
      api.auth.logout();
    } catch (error) {
      console.error("Failed to logout:", error);
    } finally {
      setUser(null);
    }
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    try {
      localStorage.setItem("elite_admin_logged_in", "true");
    } catch (error) {
      console.error("Failed to store admin login state:", error);
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem("elite_admin_logged_in");
    } catch (error) {
      console.error("Failed to clear admin login state:", error);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AppDataProvider>
        <Layout user={user} onLogout={handleLogout}>
          <Routes>
            {/* -------- PUBLIC (Families) -------- */}
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/providers" element={<Providers />} />
            <Route path="/daycare/:id" element={<DaycareDetail />} />
            <Route
              path="/tour/:id"
              element={user ? <RequestTour /> : <Navigate to="/auth" />}
            />
            <Route
              path="/profile"
              element={user ? <Profile /> : <Navigate to="/auth" />}
            />

            {/* -------- AUTH (Families) -------- */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/verify" element={<VerifyEmail />} />

            {/* -------- ADMIN LOGIN -------- */}
            <Route
              path="/admin/login"
              element={
                isAdminLoggedIn ? (
                  <Navigate to="/admin" />
                ) : (
                  <AdminLogin onLogin={handleAdminLogin} />
                )
              }
            />

            {/* -------- ADMIN (Elite team only) -------- */}
            <Route
              path="/admin"
              element={
                isAdminLoggedIn ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/admin/login" />
                )
              }
            />
            <Route
              path="/admin/daycares"
              element={
                isAdminLoggedIn ? (
                  <AdminDaycares />
                ) : (
                  <Navigate to="/admin/login" />
                )
              }
            />
            <Route
              path="/admin/providers"
              element={
                isAdminLoggedIn ? (
                  <AdminProviders />
                ) : (
                  <Navigate to="/admin/login" />
                )
              }
            />
            <Route
              path="/admin/filters"
              element={
                isAdminLoggedIn ? (
                  <AdminFilters />
                ) : (
                  <Navigate to="/admin/login" />
                )
              }
            />
            <Route
              path="/admin/tours"
              element={
                isAdminLoggedIn ? (
                  <AdminTours />
                ) : (
                  <Navigate to="/admin/login" />
                )
              }
            />

            {/* -------- FALLBACK -------- */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </AppDataProvider>
    </BrowserRouter>
  );
};

export default App;
