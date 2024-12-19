const db = require('../../config/connectDB/connect');

class exportModel {
  static getAllStore() {
    return new Promise((resolve, reject) => {
      const query = `CALL GetAllDaiLy()`; 
      db.query(query, (err, results) => {
        if (err) {
          console.error('Lỗi SQL khi lọc đại lý:', err);
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  static get_infos(StoreID) {
    return new Promise((resolve, reject) => {

        const query = `CALL GetAllInfos(${db.escape(StoreID)})`; 
        console.log(query);
        db.query(query, (err, results) => {
            if (err) {
                console.error('Lỗi SQL khi lọc đại lý:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
  }
    static insertExport(store_id,export_date,items) {
      return new Promise((resolve, reject) => {
          const itemsJson = JSON.stringify(items);
          const tmp=0;
          const query = `CALL handlephieuxuathang(${db.escape(store_id)},${db.escape(export_date)},${db.escape(tmp)},${db.escape(itemsJson)})`; 
          console.log(query);
          db.query(query, (err, results) => {
              if (err) {
                  console.error('Lỗi SQL khi thêm:', err);
                  return reject(err);
              }
              resolve(results);
          });
      });
    }

}

module.exports = exportModel;
