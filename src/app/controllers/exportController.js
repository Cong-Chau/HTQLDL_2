const exportModel = require("../models/exportModel.js");

class exportController {
  async renderExport(req, res) {
    try {
      const stores = await exportModel.getAllStore();
      res.render("export", { 
        layout: "dashboard",
        stores: stores[0]// Truyền danh sách đại lý vào view
      });
    } catch (err) {
      console.error("Error fetching stores: ", err);
      res.status(500).send("Error fetching stores");
    }
  }



  async GetInfos(req, res) {
    const StoreID = req.query.id; 
    console.log(`id: ${StoreID}`);
    if (!StoreID) {
        return res.status(400).json({ error: 'Mã cửa hàng không hợp lệ.' });
    }

    try {
        const StoreResult = await exportModel.get_infos(StoreID);
        
        // Tách các tập kết quả
        const items = StoreResult[0]; 
        const [debt] = StoreResult[1]; 
        const [rule] = StoreResult[2];

        // Định dạng dữ liệu trả về
        const responseData = {
            items,
            debt: debt?.tong_no || 0,
            rule: rule || {}
        };

        // Gửi dữ liệu JSON đến client
        console.log('Dữ liệu gửi đến frontend:', responseData);
        return res.json(responseData);
    } catch (err) {
        console.error('Lỗi khi xử lý :', err);
        res.status(500).json({ error: 'Lỗi server.' });
    }
  }


  async addExport(req, res) {
    const {store_id,export_date,items } = req.body; 

    // Kiểm tra tham số
    if (!store_id) {
        console.log(store_id);
        return res.status(400).json({ error: 'Thiếu thông tin cần thiết.' });
    }

    try {
        const insertExport = await exportModel.insertExport(store_id,export_date,items);
        console.log('insertExport:' ,insertExport);

        // Kiểm tra kết quả trả về từ model
        if (insertExport && insertExport.affectedRows > 0) {
            return res.json({ message: 'Thêm phiếu xuất thành công.' });
        } else {
            return res.status(404).json({ error: 'Không thể xuất thành công.' });
        }
    } catch (err) {
        console.error('Lỗi khi xuất:', err);
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi xuất.' });
    }
}



}

module.exports = new exportController();
