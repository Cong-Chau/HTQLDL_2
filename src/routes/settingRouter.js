const express = require("express");
const settingController = require("../app/controllers/settingController.js");

const router = express.Router();

// Định tuyến
router.get("/settings", settingController.renderSetting);

module.exports = router;
