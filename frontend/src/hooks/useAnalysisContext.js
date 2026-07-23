import { useContext } from "react";
import { AnalysisContext } from "../context/AnalysisContext.jsx";

const useAnalysisContext = () => useContext(AnalysisContext);

export default useAnalysisContext;
