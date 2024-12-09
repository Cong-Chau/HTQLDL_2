// const exportModel = require("../models/exportModel.js");

const renderExport = function (req, res) {
  res.render("export", { layout: "dashboard" });
};

module.exports = { renderExport };
