import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import Card from "../components/Card.jsx";
import useAuth from "../hooks/useAuth.js";
import { registerUser } from "../services/auth.service.js";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
      const res = await registerUser(form);
      login(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto">
        <Card>
          <p className="text-sm uppercase tracking-widest text-ink-500 font-medium mb-2">Account</p>
          <h1 className="font-display text-2xl font-semibold text-ink-700 mb-1">Create your account</h1>
          <p className="text-sm text-ink-400 mb-6">Start analyzing locations in under a minute.</p>

          {error && (
            <p className="text-sm text-brick-500 bg-red-50 rounded-lg px-3 py-2 mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wide text-ink-400">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full mt-1 rounded-lg border border-ink-100 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ink-500/40 focus:border-ink-500"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-ink-400">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full mt-1 rounded-lg border border-ink-100 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ink-500/40 focus:border-ink-500"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-ink-400">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full mt-1 rounded-lg border border-ink-100 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ink-500/40 focus:border-ink-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-ink-500 text-white font-medium hover:bg-ink-600 disabled:opacity-60 transition-colors"
            >
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </form>

          <p className="text-sm text-ink-400 mt-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-ink-500 font-medium hover:underline">
              Log in
            </Link>
          </p>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Register;