const express = require("express");
const router = express.Router();
const crawlController = require("@controllers/CrawlController");

router.post('/', crawlController.crawl.bind(crawlController));

module.exports = { router, basePath: 'crawl' };