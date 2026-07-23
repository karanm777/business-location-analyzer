import React, { createContext, useState } from "react";

export const AnalysisContext = createContext(null);

export const AnalysisProvider = ({ children }) => {
  const [lastAnalysis, setLastAnalysis] = useState(null);

  return (
    <AnalysisContext.Provider value={{ lastAnalysis, setLastAnalysis }}>
      {children}
    </AnalysisContext.Provider>
  );
};
