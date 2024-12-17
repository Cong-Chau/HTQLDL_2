const { getDealerInfoByName } = require("../models/receiptModel.js");

// Hàm hiển thị giao diện "receipt"
const renderReceipt = function (req, res) {
  res.render("receipt", { layout: "dashboard" });
};

// Hàm xử lý yêu cầu tìm thông tin đại lý
const getDealerInfoHandler = (req, res) => {
  const dealerName = req.query.dealerName;

  console.log("Nhận dealerName từ query:", dealerName);

  if (!dealerName || dealerName.trim() === "") {
    console.error("Tên đại lý không hợp lệ");
    return res.status(400).json({ error: "Tên đại lý không hợp lệ" });
  }

  getDealerInfoByName(dealerName, (err, dealerInfo) => {
    if (err) {
      console.error("Lỗi khi truy vấn dữ liệu:", err.message);
      return res.status(500).json({ error: "Lỗi khi truy vấn dữ liệu" });
    }

    if (!dealerInfo) {
      console.error(`Không tìm thấy đại lý: ${dealerName}`);
      return res.status(404).json({ error: "Không tìm thấy đại lý" });
    }

    console.log("Thông tin đại lý trả về:", dealerInfo);
    return res.status(200).json(dealerInfo);
  });
};

module.exports = {
  renderReceipt,
  getDealerInfoHandler,
};
