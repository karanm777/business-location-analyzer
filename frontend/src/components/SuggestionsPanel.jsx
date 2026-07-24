import React from "react";
import Card from "./Card.jsx";

const scoreBadgeStyle = (score) => {
  if (score >= 70) return "text-ink-500 bg-ink-50 border-ink-100";
  if (score >= 45) return "text-amber-600 bg-amber-50 border-amber-400/20";
  return "text-brick-500 bg-brick-400/10 border-brick-400/20";
};

const SuggestionsPanel = ({ suggestions, loading, error, business, onSelect }) => {
  if (!loading && !error && (!suggestions || suggestions.length === 0)) return null;

  return (
    <Card className="mt-6">
      <p className="font-mono text-xs uppercase tracking-wider text-amber-600 mb-1">
        Elsewhere in Tamil Nadu
      </p>
      <h3 className="font-display text-lg font-semibold text-ink-600 mb-1.5">
        Other peak areas for {business || "this business"}
      </h3>
      <p className="text-sm text-ink-700/70 mb-5">
        AI-suggested spots that tend to suit this business type well — starting
        with your own district, then nearby options.
      </p>

      {loading && (
        <div className="flex items-center gap-2 text-sm text-ink-700/60 py-4">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          Scouting other districts...
        </div>
      )}

      {!loading && error && (
        <p className="text-sm text-brick-500 bg-brick-400/10 border border-brick-400/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      {!loading && !error && suggestions && suggestions.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-3">
          {suggestions.map((item) => (
            <button
              key={`${item.district}-${item.pincode}`}
              type="button"
              onClick={() => onSelect && onSelect(item)}
              className="text-left rounded-lg border border-ink-100 bg-white hover:border-amber-400/50 hover:shadow-[0_4px_16px_-8px_rgba(18,64,59,0.25)] transition p-4 group"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div>
                  <p className="font-display font-semibold text-ink-600 leading-tight">
                    {item.area}
                  </p>
                  <p className="text-xs text-ink-700/60">
                    {item.district} · <span className="font-mono">{item.pincode}</span>
                  </p>
                </div>
                <span
                  className={`shrink-0 font-mono text-xs font-semibold px-2 py-0.5 rounded-full border ${scoreBadgeStyle(
                    item.score
                  )}`}
                >
                  {item.score}
                </span>
              </div>
              {item.sameDistrict && (
                <span className="inline-block text-[10px] uppercase tracking-wider font-medium text-sage-500 bg-sage-400/10 border border-sage-400/20 rounded-full px-2 py-0.5 mb-1.5">
                  Your district
                </span>
              )}
              <p className="text-sm text-ink-700/80 leading-relaxed">{item.reason}</p>
              <span className="inline-block mt-2 text-xs font-medium text-amber-600 opacity-0 group-hover:opacity-100 transition">
                Analyze this spot →
              </span>
            </button>
          ))}
        </div>
      )}
    </Card>
  );
};

export default SuggestionsPanel;
