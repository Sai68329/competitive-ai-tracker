const express = require("express");
const mongoose = require("mongoose");
const { analyzeUrl } = require("../services/llmService");
const PageCheck = require("../models/pagecheck");

const router = express.Router();

router.post("/check", async (req, res) => {
  try {
    const { url, competitorId } = req.body;

    if (!url || url.trim() === "") {
      return res.status(400).json({ error: "URL cannot be empty" });
    }

    const result = await analyzeUrl(url);

    const saved = await PageCheck.create({
      competitorId,
      url,
      result,
    });

    res.json(saved);
  } catch (error) {
    console.error("CHECK ERROR:", error.message);

    if (error.message === "LLM_FAILED") {
      return res
        .status(503)
        .json({ error: "LLM service temporarily unavailable" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/check/history/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const history = await PageCheck.find({ competitorId: id }).sort({
      createdAt: -1,
    });

    res.json(history);
  } catch (error) {
    console.error("History Error:", error.message);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

module.exports = router;