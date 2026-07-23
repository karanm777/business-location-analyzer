import React from "react";
import Card from "./Card.jsx";
import ScoreGauge from "./ScoreGauge.jsx";
import DownloadReportButton from "./DownloadReportButton.jsx";

const recommendationStyle = (recommendation) => {
  if (recommendation === "Highly Suitable" || recommendation === "Suitable") {
    return "text-ink-500 bg-ink-50 border-ink-100";
  }
  if (recommendation === "Moderately Suitable") {
    return "text-amber-600 bg-amber-50 border-amber-400/20";
  }
  return "text-brick-500 bg-brick-400/10 border-brick-400/20";
};

const AnalysisResult = ({ analysis }) => {
  if (!analysis) return null;

  const { score, recommendation, pros, cons, summary, costEstimate } = analysis;

  return (
    <Card className="mt-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-5 flex-wrap">
          <ScoreGauge score={score} />
          <div className="flex-1 min-w-[160px]">
            <p className="text-xs uppercase tracking-wider text-ink-400 mb-1.5">
              Field report
            </p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${recommendationStyle(
                recommendation
              )}`}
            >
              {recommendation}
            </span>
          </div>
        </div>
        <DownloadReportButton analysis={analysis} />
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mt-7 pt-6 border-t border-ink-100">
        <div>
          <h3 className="font-display font-semibold text-ink-600 mb-2.5">Pros</h3>
          <ul className="space-y-2 text-sm text-ink-700/90">
            {pros.map((point, index) => (
              <li key={index} className="flex gap-2.5">
                <span className="text-sage-500 font-mono mt-0.5">+</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-display font-semibold text-ink-600 mb-2.5">Cons</h3>
          <ul className="space-y-2 text-sm text-ink-700/90">
            {cons.map((point, index) => (
              <li key={index} className="flex gap-2.5">
                <span className="text-brick-400 font-mono mt-0.5">–</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-ink-100">
        <h3 className="font-display font-semibold text-ink-600 mb-2">Summary</h3>
        <p className="text-sm text-ink-700/90 leading-relaxed">{summary}</p>
      </div>

      {costEstimate && (
        <div className="mt-6 pt-6 border-t border-ink-100">
          <h3 className="font-display font-semibold text-ink-600 mb-3">
            Estimated cost <span className="text-xs font-sans font-normal text-ink-400">(AI estimate, not a quote)</span>
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-ink-50 rounded-lg px-4 py-3">
              <p className="text-xs uppercase tracking-wider text-ink-400 mb-1">Monthly rent</p>
              <p className="font-mono text-sm font-semibold text-ink-600">
                {costEstimate.monthlyRent}
              </p>
            </div>
            <div className="bg-ink-50 rounded-lg px-4 py-3">
              <p className="text-xs uppercase tracking-wider text-ink-400 mb-1">Setup cost</p>
              <p className="font-mono text-sm font-semibold text-ink-600">
                {costEstimate.setupCost}
              </p>
            </div>
          </div>
          {costEstimate.note && (
            <p className="text-xs text-ink-700/60 mt-3 leading-relaxed">{costEstimate.note}</p>
          )}
        </div>
      )}
    </Card>
  );
};

export default AnalysisResult;
