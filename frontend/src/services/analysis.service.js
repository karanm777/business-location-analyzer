import api from "./api.js";

export const analyzeLocation = async (payload) => {
  const { data } = await api.post("/analyze", payload);
  return data;
};

export const fetchHistory = async (search = "") => {
  const { data } = await api.get("/history", { params: { search } });
  return data;
};

export const deleteAnalysis = async (id) => {
  const { data } = await api.delete(`/history/${id}`);
  return data;
};
