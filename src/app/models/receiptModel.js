const db = require("../../config/connectDB/connect.js");

const getDealerInfoByName = function (dealerName, callback) {
  try {
    // Kiểm tra dealerName hợp lệ
    if (
      !dealerName ||
      typeof dealerName !== "string" ||
      dealerName.trim() === ""
    ) {
      console.error("Tên đại lý không hợp lệ");
      return callback(new Error("Tên đại lý không hợp lệ"), null);
    }

    const cleanDealerName = dealerName.trim(); // Xóa khoảng trắng thừa

    console.log("Đang tìm đại lý...");

    const query = "SELECT * FROM daiLy WHERE ten_dai_ly = ? LIMIT 1";

    // Thực hiện truy vấn cơ sở dữ liệu
    db.execute(query, [cleanDealerName], (err, results) => {
      if (err) {
        console.error("Lỗi khi truy vấn cơ sở dữ liệu:", err.message);
        return callback(err, null);
      }

      console.log("Đã truy vấn cơ sở dữ liệu");
      console.log("Kết quả từ db.execute:", results);

      // Kiểm tra nếu không tìm thấy đại lý
      if (results.length === 0) {
        console.log("Không tìm thấy đại lý.");
        return callback(null, null);
      }

      // Trả về thông tin của đại lý đầu tiên
      console.log("Thông tin đại lý nhận được:", results[0]);
      return callback(null, results[0]);
    });
  } catch (err) {
    console.error("Lỗi khi thực hiện truy vấn:", err.message);
    return callback(err, null);
  }
};

module.exports = { getDealerInfoByName };
