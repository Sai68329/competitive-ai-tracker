const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5173", 
    "X-Title": "Competitive AI Tracker",
  },
});

async function analyzeUrl(url) {
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
      max_tokens: 400,
    });

    return response.choices[0].message.content;

  } catch (error) {
    console.error(
      "OpenRouter Error:",
      error.response?.data || error.message
    );
    throw new Error("LLM_FAILED");
  }
}

async function testLLMConnection() {
  try {
    await openai.chat.completions.create({
      model: "meta-llama/llama-3-8b-instruct",
      messages: [{ role: "user", content: "Say OK" }],
      max_tokens: 5,
    });

    return "Connected";
  } catch (error) {
    return "Not Connected";
  }
}

module.exports = {
  analyzeUrl,
  testLLMConnection,
};