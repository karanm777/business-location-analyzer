import React, { useState } from "react";
import { generateReportImage } from "../utils/generateReportImage.js";

const DownloadReportButton = ({ analysis }) => {
  const [generating, setGenerating] = useState(false);

  const handleDownload = () => {
    setGenerating(true);
    try {
      const dataUrl = generateReportImage(analysis);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `location-report-${analysis.pincode}-${analysis.business
        .toLowerCase()
        .replace(/\s+/g, "-")}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={generating}
      className="text-sm px-3.5 py-1.5 rounded-lg border border-ink-100 text-ink-500 hover:bg-ink-50 transition-colors font-medium disabled:opacity-60"
    >
      {generating ? "Preparing..." : "Download report card"}
    </button>
  );
};

export default DownloadReportButton;
