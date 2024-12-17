var exportsApi = `http://localhost:3000/export/api`;

document.addEventListener('DOMContentLoaded', () => {
  // Lấy phần tử input cho ngày
  const dateInput = document.getElementById('date-export');
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0]; // Format thành yyyy-mm-dd
  dateInput.value = formattedDate;
});

document.addEventListener("DOMContentLoaded", function () {
  const addItemBtn = document.getElementById("add-item-btn");
  const messageBox = document.getElementById("message-box");
  const exportTable = document.getElementById("export-table").querySelector("tbody");
  const storeSelect = document.getElementById("store-select");

  let maxTotal = 0; // Tổng tiền tối đa
  let maxProduct = 0; // Số mặt hàng tối đa
  let maxUnit = 0; // Số đơn vị tính tối đa

  // Hàm render danh sách mặt hàng
  function renderItems(items) {
      const dropdown = document.createElement("select");
      dropdown.classList.add("item-select");
      items.forEach(item => {
          const option = document.createElement("option");
          option.value = item.ma_hang_hoa;
          option.textContent = item.ten_hang_hoa;
          option.dataset.price = item.don_gia;
          option.dataset.unit = item.ten_don_vi_tinh;
          dropdown.appendChild(option);
      });
      return dropdown;
  }

  // Hàm cập nhật lại số thứ tự trong bảng
  function updateRowNumbers() {
      Array.from(exportTable.children).forEach((row, index) => {
          row.querySelector("td:first-child").textContent = index + 1;
      });
  }

  // Hàm thêm dòng mới
  function addRow(itemData) {
      const row = document.createElement("tr");

      row.innerHTML = `
          <td>${exportTable.children.length + 1}</td>
          <td>${renderItems(itemData).outerHTML}</td>
          <td><input type="text" class="unit" readonly></td>
          <td><input type="number" class="quantity" min="1"></td>
          <td><input type="text" class="price" readonly></td>
          <td><input type="text" class="total" readonly></td>
          <td><button class="delete-item-btn">Xóa</button></td>
      `;

      exportTable.appendChild(row);
  }

  // Cập nhật thông báo
  function updateMessage(message, type = "error") {
      messageBox.textContent = message;
      messageBox.style.color = type === "error" ? "red" : "green";
  }

  // Kiểm tra tổng tiền và số lượng mặt hàng
  function validateTotal(total, productCount, unitCount) {
      if (total > maxTotal) {
          updateMessage(`Tổng tiền vượt quá giới hạn ${maxTotal} VND`);
          return false;
      }
      if (productCount > maxProduct) {
          updateMessage(`Vượt quá số mặt hàng cho phép, tối đa ${maxProduct} mặt hàng`);
          return false;
      }
      if (unitCount > maxUnit) {
          updateMessage(`Vượt quá số đơn vị tính cho phép, tối đa ${maxUnit} đơn vị`);
          return false;
      }
      updateMessage("Phiếu xuất hợp lệ", "success");
      return true;
  }

  // Sự kiện thêm hàng hóa
  addItemBtn.addEventListener("click", async () => {
      const selectedStoreId = storeSelect.value; // Lấy mã đại lý từ select
      if (!selectedStoreId) {
          updateMessage("Vui lòng chọn đại lý!", "error");
          return;
      }

      try {
          // Gửi mã đại lý qua API
          const response = await fetch(`http://localhost:3000/export/api?id=${selectedStoreId}`);
          const data = await response.json();
          console.log(`data: ${JSON.stringify(data)}`);

          // Xử lý dữ liệu trả về
          const items = data.items || [];
          maxTotal = parseFloat(data.debt) || 0;
          const quyDinh = data.rule || {};

          // Lưu lại quy định để kiểm tra
          maxProduct = quyDinh.so_loai_hang_toi_da_trong_phieu_xuat || 0;
          maxUnit = quyDinh.so_don_vi_tinh_toi_da_trong_phieu_xuat || 0;

          addRow(items);
      } catch (error) {
          console.error("Lỗi khi gọi API:", error);
          updateMessage("Không thể tải dữ liệu, vui lòng thử lại!", "error");
      }
  });

  // Sự kiện tính toán thành tiền khi nhập số lượng
  exportTable.addEventListener("input", (event) => {
      if (event.target.classList.contains("quantity")) {
          const row = event.target.closest("tr");
          const price = parseFloat(row.querySelector(".price").value) || 0;
          const quantity = parseInt(event.target.value) || 0;
          const totalField = row.querySelector(".total");
          const total = price * quantity;

          totalField.value = total.toFixed(2);

          // Kiểm tra tổng tiền và số lượng mặt hàng
          const totalMoney = Array.from(exportTable.querySelectorAll(".total"))
              .map(input => parseFloat(input.value) || 0)
              .reduce((sum, value) => sum + value, 0);

          const productCount = exportTable.querySelectorAll("tr").length;
          const unitCount = new Set(Array.from(exportTable.querySelectorAll(".unit")).map(input => input.value)).size;

          validateTotal(totalMoney, productCount, unitCount);
      }
  });

  // Sự kiện xóa mặt hàng
  exportTable.addEventListener("click", (event) => {
      if (event.target.classList.contains("delete-item-btn")) {
          const row = event.target.closest("tr");
          exportTable.removeChild(row);

          // Cập nhật lại số thứ tự
          updateRowNumbers();

          // Kiểm tra lại phiếu xuất
          const totalMoney = Array.from(exportTable.querySelectorAll(".total"))
              .map(input => parseFloat(input.value) || 0)
              .reduce((sum, value) => sum + value, 0);

          const productCount = exportTable.querySelectorAll("tr").length;
          const unitCount = new Set(Array.from(exportTable.querySelectorAll(".unit")).map(input => input.value)).size;

          validateTotal(totalMoney, productCount, unitCount);
      }
  });

  // Lắng nghe sự kiện thay đổi của dropdown items để cập nhật giá và đơn vị tính
  exportTable.addEventListener("change", (event) => {
      if (event.target.classList.contains("item-select")) {
          const row = event.target.closest("tr");
          const selectedOption = event.target.selectedOptions[0];
          const price = parseFloat(selectedOption.dataset.price) || 0;
          const unit = selectedOption.dataset.unit || '';

          row.querySelector(".price").value = price.toFixed(2);
          row.querySelector(".unit").value = unit;
      }
  });
});

