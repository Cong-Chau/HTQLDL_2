const express = require("express");
const receiptController = require("../app/controllers/receiptController.js");

const router = express.Router();

// Định tuyến
router.get("/dealer", receiptController.getDealerInfoHandler);
router.get("/receipt", receiptController.renderReceipt);

module.exports = router;
