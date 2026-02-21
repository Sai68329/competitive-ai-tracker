const express = require("express");
const router = express.Router();
const { analyzeUrl } = require("../services/llmService.js");

// Simple URL validation regex
const isValidUrl = (url) => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)" + // protocol
    "((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|" + // domain
    "localhost|" +
    "\\d{1,3}(\\.\\d{1,3}){3})" + // OR ip
    "(\\:\\d+)?(\\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?$",
    "i"
  );
  return pattern.test(url);
};

router.post("/analyze", async (req, res) => {
  try {
    const { url } = req.body;

    //  1. Empty input check
    if (!url || url.trim() === "") {
      return res.status(400).json({
        error: "URL cannot be empty",
      });
    }

    // 2. Invalid URL check
    if (!isValidUrl(url)) {
      return res.status(400).json({
        error: "Invalid URL format",
      });
    }

    // 3. Call LLM service
    const result = await analyzeUrl(url);

    return res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error("Analyze Error:", error.message);

    // 4. LLM failure handling
    return res.status(503).json({
      error: "LLM service temporarily unavailable",
    });
  }
});

module.exports = router;