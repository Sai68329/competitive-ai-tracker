// const express = require("express");
const mongoose = require("mongoose");
const { analyzeUrl } = require("../services/llmService");
// const PageCheck = require("../models/pagecheck");

// const router = express.Router();


const express = require("express");
const router = express.Router();

const Competitor = require("../models/competitor");
const PageCheck = require("../models/pagecheck");

const { fetchPageContent } = require("../services/scraperService");
const { generateHash, generateDiff, calculateImpact } = require("../services/diffService");
const { generateSummary } = require("../services/aiService");

router.post("/:id", async (req, res) => {
  try {
    const competitor = await Competitor.findById(req.params.id);

    if (!competitor) {
      return res.status(404).json({ error: "Competitor not found" });
    }

    for (let page of competitor.pages) {
      const content = await fetchPageContent(page.url);
      const hash = generateHash(content);

      const summary = await analyzeUrl(page.url);

      await PageCheck.create({
        competitorId: competitor._id,
        pageType: page.type,
        contentHash: hash,
        rawContent: content,
        summary,
        impactScore: 5,
      });
    }

    res.json({ message: "Check completed successfully" });

  } catch (error) {
    console.error("CHECK ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
});

router.get("/history/:id", async (req, res) => {
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