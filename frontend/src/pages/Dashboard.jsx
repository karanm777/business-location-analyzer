import React, { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout.jsx";
import Card from "../components/Card.jsx";
import AnalysisResult from "../components/AnalysisResult.jsx";
import LocationMap from "../components/LocationMap.jsx";
import RequirementsList from "../components/RequirementsList.jsx";
import SuggestionsPanel from "../components/SuggestionsPanel.jsx";
import BUSINESS_CATEGORIES from "../utils/businessCategories.js";
import DISTRICT_PINCODE_DATA, { DISTRICTS, getPincodesForDistrict } from "../utils/districtPincodeData.js";
import useAnalysisContext from "../hooks/useAnalysisContext.js";
import { analyzeLocation, getAreaSuggestions } from "../services/analysis.service.js";

const STORAGE_KEY = "mgf:dashboardState";

const loadSavedState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    return null;
  }
};

const Dashboard = () => {
  const saved = loadSavedState();

  const [district, setDistrict] = useState(saved?.district || "");
  const [pincode, setPincode] = useState(saved?.pincode || "");
  const [category, setCategory] = useState(saved?.category || BUSINESS_CATEGORIES[0]);
  const [customBusiness, setCustomBusiness] = useState(saved?.customBusiness || "");
  const [result, setResult] = useState(saved?.result || null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [suggestionsError, setSuggestionsError] = useState("");
  const { setLastAnalysis } = useAnalysisContext();

  const isOther = category === "Other";
  const businessValue = isOther ? customBusiness.trim() : category;
  const pincodeOptions = district ? getPincodesForDistrict(district) : [];

  useEffect(() => {
    if (saved?.result) {
      setLastAnalysis(saved.result);
      fetchSuggestions(saved.result.business, saved.district);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ district, pincode, category, customBusiness, result })
    );
  }, [district, pincode, category, customBusiness, result]);

  const handleDistrictChange = (e) => {
    const value = e.target.value;
    setDistrict(value);
    setPincode("");
  };

  const fetchSuggestions = async (business, currentDistrict) => {
    setSuggestions([]);
    setSuggestionsError("");
    setSuggestionsLoading(true);
    try {
      const districts = Object.entries(DISTRICT_PINCODE_DATA)
        .filter(([name]) => name !== currentDistrict)
        .map(([name, areas]) => ({ district: name, areas }));

      const res = await getAreaSuggestions({
        business,
        excludeDistrict: currentDistrict,
        districts
      });
      setSuggestions(res.data.suggestions);
    } catch (err) {
      setSuggestionsError(
        err.response?.data?.message || "Couldn't load suggestions right now."
      );
    } finally {
      setSuggestionsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setSuggestions([]);
    setSuggestionsError("");
    setLoading(true);
    try {
      const res = await analyzeLocation({ pincode, business: businessValue });
      setResult(res.data.analysis);
      setLastAnalysis(res.data.analysis);
      fetchSuggestions(businessValue, district);
    } catch (err) {
      setError(err.response?.data?.message || "Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionSelect = (item) => {
    setDistrict(item.district);
    setPincode(item.pincode);
    setResult(null);
    setSuggestions([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
            Pick a district, then a pincode, then a business type to get an AI-generated
            suitability report.
          </p>

          {error && (
            <p className="text-sm text-brick-500 bg-brick-400/10 border border-brick-400/20 rounded-lg px-3 py-2 mb-4">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-ink-400 uppercase tracking-wider">
                  District
                </label>
                <select
                  value={district}
                  onChange={handleDistrictChange}
                  required
                  className="w-full mt-1 rounded-lg border border-ink-100 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition"
                >
                  <option value="" disabled>
                    Select a district
                  </option>
                  {DISTRICTS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-ink-400 uppercase tracking-wider">
                  Pincode / Area
                </label>
                <select
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  required
                  disabled={!district}
                  className="w-full mt-1 rounded-lg border border-ink-100 px-3 py-2.5 text-sm font-mono bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition disabled:bg-ink-50 disabled:text-ink-400"
                >
                  <option value="" disabled>
                    {district ? "Select a pincode" : "Select district first"}
                  </option>
                  {pincodeOptions.map((item) => (
                    <option key={item.pincode} value={item.pincode}>
                      {item.pincode} — {item.area}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs text-ink-400 uppercase tracking-wider">
                Business type
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full mt-1 rounded-lg border border-ink-100 px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition"
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
              disabled={loading || !pincode || (isOther && !customBusiness.trim())}
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
            <SuggestionsPanel
              suggestions={suggestions}
              loading={suggestionsLoading}
              error={suggestionsError}
              business={result.business}
              onSelect={handleSuggestionSelect}
            />
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Dashboard;
