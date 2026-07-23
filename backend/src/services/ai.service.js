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

Also estimate typical setup costs for this business at this location, based on
general knowledge of commercial rents and small-business setup costs in
similar Indian localities. Give ranges in Indian Rupees (₹), formatted like
"₹15,000 - ₹25,000".

Also list the key vendors, suppliers, and professionals someone would typically
need to contact to set up this specific business type (not generic advice —
be specific to the business, e.g. a bar/pub needs steel furniture suppliers
and a liquor license consultant; a school needs a civil engineer and a
playground equipment supplier). Give 4-6 short category names, not company
names or phone numbers (real company names/numbers are not known to you).

Respond with ONLY valid JSON, no markdown, no code fences, no extra text.
Use exactly this structure:

{
  "score": <integer 0-100>,
  "recommendation": "<'Highly Suitable' | 'Suitable' | 'Moderately Suitable' | 'Not Suitable'>",
  "pros": ["<short point>", "<short point>", "<short point>"],
  "cons": ["<short point>", "<short point>"],
  "summary": "<2-3 sentence summary>",
  "costEstimate": {
    "monthlyRent": "<range string, e.g. '₹18,000 - ₹28,000 / month'>",
    "setupCost": "<range string, e.g. '₹1,50,000 - ₹3,00,000 one-time'>",
    "note": "<one short sentence explaining what drives the cost here>"
  },
  "requirements": ["<vendor/professional category>", "<vendor/professional category>", "..."]
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
    summary: parsed.summary || "",
    costEstimate: {
      monthlyRent: parsed.costEstimate?.monthlyRent || "Not available",
      setupCost: parsed.costEstimate?.setupCost || "Not available",
      note: parsed.costEstimate?.note || ""
    },
    requirements: Array.isArray(parsed.requirements) ? parsed.requirements : []
  };
};

const buildChatPrompt = (message, history, context) => {
  const historyText = (history || [])
    .slice(-6)
    .map((turn) => `${turn.role === "user" ? "User" : "Assistant"}: ${turn.text}`)
    .join("\n");

  const contextText = context
    ? `The user's most recent analysis: pincode ${context.pincode}, business "${context.business}", score ${context.score}/100, recommendation "${context.recommendation}".`
    : "The user has no recent analysis in this session.";

  return `
You are a friendly assistant inside the "Market Gap Finder" app.
You help users understand business location suitability, explain how to use
the app, and answer general questions about starting a small business at a
given location in India.

${contextText}

Keep answers short and conversational: 2-4 sentences, no markdown headers,
no bullet lists unless the user explicitly asks for a list.

Conversation so far:
${historyText || "(no previous messages)"}

User: ${message}
Assistant:
`;
};

export const generateChatReply = async (message, history, context) => {
  const prompt = buildChatPrompt(message, history, context);

  const response = await getAiClient().models.generateContent({
    model: "gemini-flash-latest",
    contents: prompt
  });

  const rawText = response.text;

  if (!rawText) {
    throw new Error("AI service returned an empty response");
  }

  return rawText.trim();
};
