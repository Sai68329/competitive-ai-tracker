const mongoose = require("mongoose");

const pageCheckSchema = new mongoose.Schema(
  {
    competitorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    pageType: String,
    contentHash: String,
    rawContent: String,
    diffContent: String,
    summary: String,

    impactScore: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("PageCheck", pageCheckSchema);