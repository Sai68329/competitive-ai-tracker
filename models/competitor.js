const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema({
  type: { 
    type: String, 
    required: true },
  url: { 
    type: String,
    required: true }
});

const CompetitorSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true },
  tags: [String],
  pages: [PageSchema]
}, { timestamps: true });

module.exports = mongoose.model("Competitor", CompetitorSchema);