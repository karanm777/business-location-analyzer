import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import Card from "../components/Card.jsx";
import Loader from "../components/Loader.jsx";
import { fetchHistory, deleteAnalysis } from "../services/analysis.service.js";

const scoreDot = (score) => {
  if (score >= 70) return "bg-signal-good";
  if (score >= 40) return "bg-signal-mid";
  return "bg-signal-bad";
};

const History = () => {
  const [analyses, setAnalyses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadHistory = async (searchTerm = "") => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchHistory(searchTerm);
      setAnalyses(res.data.analyses);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    loadHistory(search);
  };

  const handleDelete = async (id) => {
    try {
      await deleteAnalysis(id);
      setAnalyses((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete analysis");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <p className="text-sm uppercase tracking-widest text-brand-600 font-medium mb-2">
          Past analyses
        </p>
        <h1 className="font-display text-2xl font-semibold text-ink mb-6">History</h1>

        <form onSubmit={handleSearch} className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Search by pincode or business type"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-lg border border-line px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg border border-line hover:bg-white text-sm font-medium transition-colors"
          >
            Search
          </button>
        </form>

        {error && (
          <p className="text-sm text-signal-bad bg-red-50 rounded-lg px-3 py-2 mb-4">{error}</p>
        )}

        {loading ? (
          <Loader label="Loading history..." />
        ) : analyses.length === 0 ? (
          <Card>
            <p className="text-sm text-muted">No analyses yet — run one from the Dashboard.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {analyses.map((item) => (
              <Card key={item._id} className="!p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <span
                      className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${scoreDot(item.score)}`}
                      aria-hidden="true"
                    ></span>
                    <div>
                      <p className="font-medium text-ink">
                        {item.business} <span className="text-muted font-mono text-sm">&middot; {item.pincode}</span>
                      </p>
                      <p className="text-sm text-muted mt-1">{item.summary}</p>
                      <p className="text-xs text-muted mt-2 font-mono">
                        {item.score}/100 &middot; {item.recommendation}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-sm text-signal-bad hover:opacity-70 whitespace-nowrap transition-opacity"
                  >
                    Delete
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default History;
