const axios = require("axios");
const cheerio = require("cheerio");

async function fetchPageContent(url) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  return $("body").text();
}

module.exports = { fetchPageContent };