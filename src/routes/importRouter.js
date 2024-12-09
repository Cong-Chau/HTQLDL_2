const express = require("express");
const importController = require("../app/controllers/importController.js");

const router = express.Router();

// Định tuyến
router.get("/import", importController.renderImport);

module.exports = router;
