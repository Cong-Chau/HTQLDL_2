const db = require("../../config/connectDB/connect");

const getRevenue = function (month, year, callback) {
  const query = "CALL BaoCaoDoanhThu(?, ?); ";

  db.query(query, [month, year], (err, results) => {
    if (err) {
      console.error("Lỗi khi truy vấn: ", err.message);
      return callback(
        { message: "Lỗi truy vấn cơ sở dữ liệu", error: err },
        null
      );
    }
    if (results.length === 0) {
      return callback(null, {
        message: "Không có dữ liệu cho tháng và năm này.",
      });
    }
    callback(null, results);
  });
};

const getDebt = function (month, year, callback) {
  const query = "CALL BaoCaoCongNo(?, ?); ";

  db.query(query, [month, year], (err, results) => {
    if (err) {
      console.error("Lỗi khi truy vấn: ", err.message);
      return callback(
        { message: "Lỗi truy vấn cơ sở dữ liệu", error: err },
        null
      );
    }
    if (results.length === 0) {
      return callback(null, {
        message: "Không có dữ liệu cho tháng và năm này.",
      });
    }
    callback(null, results);
  });
};

module.exports = { getRevenue, getDebt };
