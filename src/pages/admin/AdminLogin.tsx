// src/pages/admin/AdminLogin.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface AdminLoginProps {
  onLogin: () => void;
}

const ADMIN_EMAIL = "admin@elitecare.ca";
const ADMIN_PASSWORD = "Elite2025!"; // می‌تونی هر چیزی دوست داشتی بزاری

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      onLogin(); // به اپ می‌گه ادمین لاگین شده
      navigate("/admin"); // هدایت به داشبورد ادمین
    } else {
      setError("Invalid admin credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Elite Admin Login
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          This area is reserved for the Elite team. Please enter your admin
          credentials.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Admin email
            </label>
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border-gray-300 text-sm focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="admin@elitecare.ca"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border-gray-300 text-sm focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter admin password"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 text-red-700 text-xs px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-2 inline-flex justify-center items-center px-4 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700"
          >
            Sign in as admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
