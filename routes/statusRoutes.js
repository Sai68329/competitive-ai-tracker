const express = require("express");
const mongoose = require("mongoose");
const { testLLMConnection } = require("../services/llmService");

const router = express.Router();

router.get("/status", async (req, res) => {
  try {
    const dbStatus =
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected";

    const llmConnected = await testLLMConnection();

    res.json({
      backend: "ok",
      database: dbStatus,
      llm: llmConnected ? "connected" : "disconnected",
    });
  } catch (error) {
    console.error("Status Error:", error.message);
    res.status(500).json({ error: "Status check failed" });
  }
});

module.exports = router;