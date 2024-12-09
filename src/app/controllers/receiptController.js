// const receiptModel = require("../models/receiptModel.js");

const renderReceipt = function (req, res) {
  res.render("receipt", { layout: "dashboard" });
};

module.exports = { renderReceipt };
