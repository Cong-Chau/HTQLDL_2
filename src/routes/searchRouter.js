const express = require("express");
const searchController = require("../app/controllers/searchController.js");
const router = express.Router();

// Định tuyến
router.get("/search", searchController.renderSearch);

module.exports = router;
