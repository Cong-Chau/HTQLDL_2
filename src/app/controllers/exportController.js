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




}

module.exports = new exportController();
