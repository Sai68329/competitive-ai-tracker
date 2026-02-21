const crypto = require("crypto");
const diff = require("diff");

// Generate content hash
function generateHash(content) {
  return crypto.createHash("md5").update(content).digest("hex");
}

// Generate text diff
function generateDiff(oldContent, newContent) {
  return diff.diffLines(oldContent, newContent);
}

// Calculate business impact score
function calculateImpact(diffResult) {
  let score = 0;

  const importantKeywords = [
    "price",
    "pricing",
    "$",
    "plan",
    "enterprise",
    "api",
    "subscription",
    "billing",
    "feature",
    "launch",
    "update",
  ];

  diffResult.forEach(part => {
    if (part.added || part.removed) {
      importantKeywords.forEach(keyword => {
        if (part.value.toLowerCase().includes(keyword)) {
          score += 2;
        }
      });
    }
  });

  return score;
}

module.exports = {
  generateHash,
  generateDiff,
  calculateImpact
};