const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  
});

// console.log("API KEY:", process.env.OPENAI_API_KEY);
// Analyze
const analyzeUrl = async (url) => {
  try {
    const response = await openai.chat.completions.create({
      model: "grok-4-1-fast",
      messages: [
        { role: "system", content: "You are a competitive intelligence analyst." },
        { role: "user", content: `Analyze this website: ${url}` }
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Analyze Error:", error.response?.data || error.message);
    throw new Error("LLM_FAILED");
  }
};

// Test connection
const testLLMConnection = async () => {
  try {
    await openai.chat.completions.create({
      model: "grok-4-1-fast",
      messages: [{ role: "user", content: "Say OK" }],
      max_tokens: 5,
    });

    return true;
  } catch (error) {
    console.error("Test LLM Error:", error.response?.data || error.message);
    return false;
  }
};

module.exports = {
  analyzeUrl,
  testLLMConnection,
};