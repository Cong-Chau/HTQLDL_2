const searchModel = require("../models/searchModel.js");

const renderSearch = function (req, res) {
  res.render("search", { layout: "dashboard" });
};

module.exports = { renderSearch };
