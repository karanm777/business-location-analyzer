import api from "./api.js";

export const sendChatMessage = async (message, history, context) => {
  const { data } = await api.post("/chat", { message, history, context });
  return data;
};
