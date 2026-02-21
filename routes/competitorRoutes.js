const express = require("express");
const Competitor = require("../models/competitor");
const validator = require("validator");
const mongoose = require("mongoose");

const router = express.Router();

/* 
   CREATE COMPETITOR
*/
router.post("/", async (req, res) => {
  try {
    const { name, pages, tags } = req.body;

    // ✅ Validate name
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Name required" });
    }

    // ✅ Validate pages
    if (!Array.isArray(pages) || pages.length === 0) {
      return res.status(400).json({ error: "At least one page required" });
    }

    // ✅ Validate each page URL
    for (let page of pages) {
      if (!page.url || !validator.isURL(page.url)) {
        return res.status(400).json({ error: "Invalid URL in pages" });
      }
    }

    const competitor = await Competitor.create({
      name: name.trim(),
      pages,
      tags,
    });

    res.status(201).json(competitor);

  } catch (error) {
    console.error("CREATE ERROR:", error.message);
    res.status(500).json({ error: "Failed to create competitor" });
  }
});


/* 
   GET ALL COMPETITORS
 */
router.get("/", async (req, res) => {
  try {
    const competitors = await Competitor.find().sort({ createdAt: -1 });
    res.json(competitors);
  } catch (error) {
    console.error("GET ERROR:", error.message);
    res.status(500).json({ error: "Failed to fetch competitors" });
  }
});


/* 
   DELETE COMPETITOR
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid competitor ID" });
    }

    const deleted = await Competitor.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Competitor not found" });
    }

    res.json({ message: "Deleted successfully" });

  } catch (error) {
    console.error("DELETE ERROR:", error.message);
    res.status(500).json({ error: "Failed to delete competitor" });
  }
});

module.exports = router;