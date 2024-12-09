// const settingModel = require("../models/settingModel.js");

const renderSetting = function (req, res) {
  res.render("setting", { layout: "dashboard" });
};

module.exports = { renderSetting };
