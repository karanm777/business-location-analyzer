import React from "react";
import Card from "./Card.jsx";

const RequirementsList = ({ requirements, pincode }) => {
  if (!requirements || requirements.length === 0) return null;

  const buildSearchUrl = (category) => {
    const query = encodeURIComponent(`${category} near ${pincode}, India`);
    return `https://www.google.com/maps/search/${query}`;
  };

  return (
    <Card className="mt-6">
      <h3 className="font-display font-semibold text-ink-600 mb-1">What you'll need</h3>
      <p className="text-sm text-ink-700/60 mb-4">
        Vendors and professionals to contact for this business. Tap one to find real,
        nearby options on Google Maps.
      </p>
      <div className="flex flex-wrap gap-2.5">
        {requirements.map((item, index) => (
          <a
            key={index}
            href={buildSearchUrl(item)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-ink-50 border border-ink-100 text-sm text-ink-600 hover:bg-ink-100 hover:border-ink-100 transition-colors"
          >
            {item}
            <span className="text-ink-400 text-xs">↗</span>
          </a>
        ))}
      </div>
    </Card>
  );
};

export default RequirementsList;
