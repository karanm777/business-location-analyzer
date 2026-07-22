import React from "react";
import Card from "./Card.jsx";
import SuitabilityDial from "./SuitabilityDial.jsx";

const recommendationStyle = (recommendation) => {
  if (recommendation === "Highly Suitable" || recommendation === "Suitable") {
    return "text-sage-500 bg-sage-50";
  }
  if (recommendation === "Moderately Suitable") {
    return "text-amber-600 bg-amber-50";
  }
  return "text-brick-500 bg-red-50";
};

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
    <circle cx="8" cy="8" r="7" stroke="#1F8A5C" strokeWidth="1.4" />
    <path d="M8 5v6M5 8h6" stroke="#1F8A5C" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const MinusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
    <circle cx="8" cy="8" r="7" stroke="#B24C3A" strokeWidth="1.4" />
    <path d="M5 8h6" stroke="#B24C3A" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const AnalysisResult = ({ analysis }) => {
  if (!analysis) return null;

  const { score, recommendation, pros, cons, summary } = analysis;

  return (
    <Card className="mt-6">
      <div className="grid sm:grid-cols-[auto,1fr] gap-8 items-center">
        <SuitabilityDial score={score} size={200} />
        <div>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${recommendationStyle(
              recommendation
            )}`}
          >
            {recommendation}
          </span>
          <p className="text-sm text-ink-600 mt-3 leading-relaxed">{summary}</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mt-8 pt-6 border-t border-ink-100">
        <div>
          <h3 className="font-display font-medium text-ink-700 mb-3">What's working</h3>
          <ul className="space-y-2.5 text-sm text-ink-600">
            {pros.map((point, index) => (
              <li key={index} className="flex gap-2">
                <PlusIcon />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-display font-medium text-ink-700 mb-3">Worth weighing</h3>
          <ul className="space-y-2.5 text-sm text-ink-600">
            {cons.map((point, index) => (
              <li key={index} className="flex gap-2">
                <MinusIcon />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default AnalysisResult;