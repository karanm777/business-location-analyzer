import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import Card from "../components/Card.jsx";
import AnalysisResult from "../components/AnalysisResult.jsx";
import { analyzeLocation } from "../services/analysis.service.js";

const Dashboard = () => {
  const [form, setForm] = useState({ pincode: "", business: "" });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const res = await analyzeLocation(form);
      setResult(res.data.analysis);
    } catch (err) {
      setError(err.response?.data?.message || "Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <p className="text-sm uppercase tracking-widest text-ink-500 font-medium mb-2">
          Dashboard
        </p>
        <h1 className="font-display text-2xl font-semibold text-ink-700 mb-6">
          Analyze a location
        </h1>

        <Card>
          {error && (
            <p className="text-sm text-brick-500 bg-red-50 rounded-lg px-3 py-2 mb-4">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="text-xs uppercase tracking-wide text-ink-400">Pincode</label>
              <input
                type="text"
                name="pincode"
                placeholder="641004"
                value={form.pincode}
                onChange={handleChange}
                required
                className="w-full mt-1 font-mono rounded-lg border border-ink-100 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ink-500/40 focus:border-ink-500"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs uppercase tracking-wide text-ink-400">Business type</label>
              <input
                type="text"
                name="business"
                placeholder="Coffee Shop"
                value={form.business}
                onChange={handleChange}
                required
                className="w-full mt-1 rounded-lg border border-ink-100 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ink-500/40 focus:border-ink-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 mt-auto rounded-lg bg-ink-500 text-white font-medium hover:bg-ink-600 disabled:opacity-60 whitespace-nowrap transition-colors"
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </form>
        </Card>

        {result && <AnalysisResult analysis={result} />}
      </div>
    </MainLayout>
  );
};

export default Dashboard;