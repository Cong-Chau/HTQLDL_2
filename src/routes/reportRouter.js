const express = require("express");
const reportController = require("../app/controllers/reportController.js");

const router = express.Router();

// Định tuyến
router.get("/report", reportController.renderReport);

module.exports = router;
