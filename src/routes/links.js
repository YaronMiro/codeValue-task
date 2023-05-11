const express = require("express");
const router = express.Router();

const linksController = require("@controllers/LinksController");

router.get('/', linksController.links.bind(linksController));

module.exports = { router, basePath: 'links' };