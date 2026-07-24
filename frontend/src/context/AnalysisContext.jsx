import React, { createContext, useState } from "react";

export const AnalysisContext = createContext(null);

const STORAGE_KEY = "mgf:lastAnalysis";
const FORM_KEY = "mgf:lastForm";

const readStoredAnalysis = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
};

const readStoredForm = () => {
  try {
    const raw = localStorage.getItem(FORM_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
};

export const AnalysisProvider = ({ children }) => {
  const [lastAnalysis, setLastAnalysisState] = useState(() => readStoredAnalysis());
  const [lastForm, setLastFormState] = useState(() => readStoredForm());

  const setLastAnalysis = (analysis) => {
    setLastAnalysisState(analysis);
    try {
      if (analysis) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(analysis));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      // ignore storage errors (e.g. private browsing)
    }
  };

  const setLastForm = (form) => {
    setLastFormState(form);
    try {
      localStorage.setItem(FORM_KEY, JSON.stringify(form));
    } catch (error) {
      // ignore storage errors
    }
  };

  return (
    <AnalysisContext.Provider
      value={{ lastAnalysis, setLastAnalysis, lastForm, setLastForm }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};
