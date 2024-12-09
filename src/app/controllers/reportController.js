// const reportModel = require("../models/reportModel.js");

const renderReport = function (req, res) {
  res.render("report", { layout: "dashboard" });
};

module.exports = { renderReport };
