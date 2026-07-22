import { GoogleGenAI } from "@google/genai";

let ai;

const getAiClient = () => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return ai;
};

const buildPrompt = (pincode, business) => `
You are a location intelligence assistant.

Analyze whether the business type "${business}" would be suitable to open
at the Indian pincode "${pincode}".

Base your reasoning on typical characteristics of that area (population
density, competition, connectivity, commercial activity) using your general
knowledge. If you are not certain about the exact pincode, make a
reasonable, realistic estimate and do not mention uncertainty in the output.

Respond with ONLY valid JSON, no markdown, no code fences, no extra text.
Use exactly this structure:

{
  "score": <integer 0-100>,
  "recommendation": "<'Highly Suitable' | 'Suitable' | 'Moderately Suitable' | 'Not Suitable'>",
  "pros": ["<short point>", "<short point>", "<short point>"],
  "cons": ["<short point>", "<short point>"],
  "summary": "<2-3 sentence summary>"
}
`;

const cleanJsonText = (text) => {
  return text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
};

export const generateLocationAnalysis = async (pincode, business) => {
  const prompt = buildPrompt(pincode, business);

  const response = await getAiClient().models.generateContent({
    model: "gemini-flash-latest",
    contents: prompt
  });

  const rawText = response.text;

  if (!rawText) {
    throw new Error("AI service returned an empty response");
  }

  let parsed;
  try {
    parsed = JSON.parse(cleanJsonText(rawText));
  } catch (error) {
    throw new Error("Failed to parse AI response as JSON");
  }

  return {
    score: Number(parsed.score) || 0,
    recommendation: parsed.recommendation || "Not Suitable",
    pros: Array.isArray(parsed.pros) ? parsed.pros : [],
    cons: Array.isArray(parsed.cons) ? parsed.cons : [],
    summary: parsed.summary || ""
  };
};