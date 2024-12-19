const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // Thay bằng username của bạn
  password: "112233", // Thay bằng password của bạn
  database: "qldl", // Thay bằng tên database của bạn
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

connection.connect((err) => {
  if (err) {
    console.error("Kết nối MySQL thất bại:", err);
    return;
  }
  console.log("Kết nối MySQL thành công!!!");
});

// Export đối tượng connection
module.exports = connection;
