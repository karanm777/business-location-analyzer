import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import Card from "../components/Card.jsx";
import Loader from "../components/Loader.jsx";
import { fetchHistory, deleteAnalysis } from "../services/analysis.service.js";

const recommendationDot = (recommendation) => {
  if (recommendation === "Highly Suitable" || recommendation === "Suitable") return "bg-sage-500";
  if (recommendation === "Moderately Suitable") return "bg-amber-500";
  return "bg-brick-400";
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
      <div className="max-w-3xl mx-auto pt-4">
        <p className="font-mono text-xs uppercase tracking-wider text-amber-600 mb-1">
          Past reports
        </p>
        <h1 className="font-display text-2xl font-semibold text-ink-600 mb-5">
          Analysis history
        </h1>

        <form onSubmit={handleSearch} className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Search by pincode or business type"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-lg border border-ink-100 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg border border-ink-100 text-ink-500 hover:bg-ink-50 transition-colors text-sm font-medium"
          >
            Search
          </button>
        </form>

        {error && (
          <p className="text-sm text-brick-500 bg-brick-400/10 border border-brick-400/20 rounded-lg px-3 py-2 mb-4">
            {error}
          </p>
        )}

        {loading ? (
          <Loader label="Loading history..." />
        ) : analyses.length === 0 ? (
          <Card>
            <p className="text-sm text-ink-700/60">No analyses found yet.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {analyses.map((item) => (
              <Card key={item._id} className="!p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${recommendationDot(
                          item.recommendation
                        )}`}
                      />
                      <p className="font-display font-semibold text-ink-600 truncate">
                        {item.business} <span className="text-ink-400 font-normal">·</span>{" "}
                        <span className="font-mono text-sm">{item.pincode}</span>
                      </p>
                    </div>
                    <p className="text-sm text-ink-700/70 mt-1.5">{item.summary}</p>
                    <p className="text-xs text-ink-400 mt-2 font-mono">
                      {item.score}/100 &nbsp;&middot;&nbsp; {item.recommendation}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-sm text-brick-500 hover:text-brick-400 whitespace-nowrap shrink-0"
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
