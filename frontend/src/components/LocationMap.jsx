import React, { useState } from "react";
import Card from "./Card.jsx";

const LocationMap = ({ pincode, business }) => {
  const [view, setView] = useState("area");

  if (!pincode) return null;

  const areaQuery = encodeURIComponent(`${pincode}, India`);
  const competitorsQuery = encodeURIComponent(`${business} near ${pincode}, India`);

  const src =
    view === "competitors"
      ? `https://www.google.com/maps?q=${competitorsQuery}&output=embed`
      : `https://www.google.com/maps?q=${areaQuery}&output=embed`;

  return (
    <Card className="mt-6 !p-0 overflow-hidden">
      <div className="px-6 pt-5 pb-3 flex items-center justify-between flex-wrap gap-2">
        <div>
          <h3 className="font-display font-semibold text-ink-600">Location on map</h3>
          <p className="text-sm text-ink-700/60 mt-0.5">Pincode {pincode}</p>
        </div>
        <div className="flex rounded-lg border border-ink-100 overflow-hidden text-xs font-medium">
          <button
            onClick={() => setView("area")}
            className={`px-3 py-1.5 transition-colors ${
              view === "area" ? "bg-ink-500 text-paper" : "bg-white text-ink-500 hover:bg-ink-50"
            }`}
          >
            Area view
          </button>
          <button
            onClick={() => setView("competitors")}
            className={`px-3 py-1.5 transition-colors border-l border-ink-100 ${
              view === "competitors"
                ? "bg-ink-500 text-paper"
                : "bg-white text-ink-500 hover:bg-ink-50"
            }`}
          >
            Nearby competitors
          </button>
        </div>
      </div>

      {view === "competitors" && (
        <p className="px-6 pb-2 text-xs text-ink-400">
          Showing existing "{business}" businesses reported near this pincode.
        </p>
      )}

      <iframe
        key={view}
        title={`Map for pincode ${pincode}`}
        src={src}
        width="100%"
        height="280"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </Card>
  );
};

export default LocationMap;
