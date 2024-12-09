// const importModel = require("../models/importModel.js");

const renderImport = function (req, res) {
  res.render("import", { layout: "dashboard" });
};

module.exports = { renderImport };
