import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import Card from "../components/Card.jsx";
import AnalysisResult from "../components/AnalysisResult.jsx";
import LocationMap from "../components/LocationMap.jsx";
import RequirementsList from "../components/RequirementsList.jsx";
import BUSINESS_CATEGORIES from "../utils/businessCategories.js";
import useAnalysisContext from "../hooks/useAnalysisContext.js";
import { analyzeLocation } from "../services/analysis.service.js";

const Dashboard = () => {
  const [pincode, setPincode] = useState("");
  const [category, setCategory] = useState(BUSINESS_CATEGORIES[0]);
  const [customBusiness, setCustomBusiness] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setLastAnalysis } = useAnalysisContext();

  const isOther = category === "Other";
  const businessValue = isOther ? customBusiness.trim() : category;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const res = await analyzeLocation({ pincode, business: businessValue });
      setResult(res.data.analysis);
      setLastAnalysis(res.data.analysis);
    } catch (err) {
      setError(err.response?.data?.message || "Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto pt-4">
        <Card>
          <p className="font-mono text-xs uppercase tracking-wider text-amber-600 mb-1">
            Analysis
          </p>
          <h1 className="font-display text-2xl font-semibold text-ink-600 mb-1.5">
            Analyze a location
          </h1>
          <p className="text-sm text-ink-700/70 mb-5">
            Enter a pincode and business type to get an AI-generated suitability report.
          </p>

          {error && (
            <p className="text-sm text-brick-500 bg-brick-400/10 border border-brick-400/20 rounded-lg px-3 py-2 mb-4">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                name="pincode"
                placeholder="Pincode (e.g. 641004)"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
                className="flex-1 rounded-lg border border-ink-100 px-3 py-2.5 text-sm font-mono bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex-1 rounded-lg border border-ink-100 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition"
              >
                {BUSINESS_CATEGORIES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {isOther && (
              <input
                type="text"
                placeholder="Enter your business type"
                value={customBusiness}
                onChange={(e) => setCustomBusiness(e.target.value)}
                required
                className="w-full rounded-lg border border-ink-100 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition"
              />
            )}

            <button
              type="submit"
              disabled={loading || (isOther && !customBusiness.trim())}
              className="w-full py-2.5 rounded-lg bg-ink-500 text-paper font-medium hover:bg-ink-600 disabled:opacity-60 transition-colors"
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </form>
        </Card>

        {result && (
          <>
            <AnalysisResult analysis={result} />
            <LocationMap pincode={result.pincode} business={result.business} />
            <RequirementsList requirements={result.requirements} pincode={result.pincode} />
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Dashboard;
