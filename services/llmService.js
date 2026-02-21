require("dotenv").config();
const OpenAI = require("openai");

if (!process.env.OPENROUTER_API_KEY) {
  throw new Error("OPENROUTER_API_KEY is missing in .env");
}

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": process.env.FRONTEND_URL || "http://localhost:5173",
    "X-Title": "CompetitiveAITracker",
  },
});

// Analyze URL
const analyzeUrl = async (url) => {
  try {
    const response = await openai.chat.completions.create({
      model: "meta-llama/llama-3-8b-instruct",
      messages: [
        {
          role: "system",
          content:
            "You are a competitive intelligence analyst. Extract pricing, features, and positioning clearly.",
        },
        {
          role: "user",
          content: `Analyze this website and provide structured insights:\n${url}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    return response.choices[0].message.content;

  } catch (error) {
    console.error(
      "OpenRouter Analyze Error:",
      error.response?.data || error.message
    );
    throw new Error("LLM_FAILED");
  }
};

// LLM Health Check
const testLLMConnection = async () => {
  try {
    await openai.chat.completions.create({
      model: "meta-llama/llama-3-8b-instruct",
      messages: [{ role: "user", content: "Say OK" }],
      max_tokens: 5,
    });

    return true;
  } catch (error) {
    console.error(
      "OpenRouter Test Error:",
      error.response?.data || error.message
    );
    return false;
  }
};

module.exports = {
  analyzeUrl,
  testLLMConnection,
};