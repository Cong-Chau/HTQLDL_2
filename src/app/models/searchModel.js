<<<<<<< HEAD
const db = require("../../config/connectDB/connect"); // Import kết nối MySQL

class searchModel {
  static getSearch() {
    return new Promise((resolve, reject) => {
      const query = `CALL GetAllDaiLy()`;
      db.query(query, (err, results) => {
        if (err) {
          console.error("Lỗi SQL khi loc dai ly:", err);
          return reject(err);
        }
        resolve(results);
      });
    });
  }
}
module.exports = searchModel;
=======
const db = require('../../config/connectDB/connect'); // Import kết nối MySQL

class searchModel {
    static getSearch() {
            return new Promise((resolve, reject) => {
                const query = `CALL GetAllDaiLy()`;
                db.query(query, (err, results) => {
                    if (err) {
                        console.error('Lỗi SQL khi loc dai ly:', err);
                        return reject(err);
                    }
                    resolve(results);
                });
            }
        )
    };

}
module.exports = searchModel;
>>>>>>> e56de7a173bce1a37b85169bd82c930fc74bb9ca
