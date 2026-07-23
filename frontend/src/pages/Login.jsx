import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import Card from "../components/Card.jsx";
import useAuth from "../hooks/useAuth.js";
import { loginUser } from "../services/auth.service.js";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await loginUser(form);
      login(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto pt-6">
        <Card>
          <p className="font-mono text-xs uppercase tracking-wider text-amber-600 mb-1">
            Welcome back
          </p>
          <h1 className="font-display text-2xl font-semibold text-ink-600 mb-5">Log in</h1>

          {error && (
            <p className="text-sm text-brick-500 bg-brick-400/10 border border-brick-400/20 rounded-lg px-3 py-2 mb-4">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-ink-700/70">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full mt-1 rounded-lg border border-ink-100 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition"
              />
            </div>
            <div>
              <label className="text-sm text-ink-700/70">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full mt-1 rounded-lg border border-ink-100 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-ink-500 text-paper font-medium hover:bg-ink-600 disabled:opacity-60 transition-colors"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="text-sm text-ink-700/60 mt-5 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-ink-500 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Login;
