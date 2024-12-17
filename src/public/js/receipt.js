//tiền nợ
debt = 0;

function listen() {
  // Truy xuất các trường nhập liệu
  const nameInput = document.querySelector('input[name="input_name"]');
  const addressInput = document.querySelector('input[name="input_address"]');
  const phoneInput = document.querySelector('input[name="input_phone"]');
  const emailInput = document.querySelector('input[name="input_email"]');
  const dateInput = document.querySelector('input[name="input_date"]');
  const priceInput = document.querySelector('input[name="input_price"]');

  // tự động điền ngày hiện tại
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const dd = String(today.getDate()).padStart(2, "0");

  // Định dạng ngày theo chuẩn "YYYY-MM-DD"
  const formattedDate = `${yyyy}-${mm}-${dd}`;

  // Đặt giá trị mặc định cho ô input
  dateInput.value = formattedDate;

  // Tự động điền thông tin của các trường khác
  nameInput.addEventListener("blur", () => {
    const inputName = nameInput.value.trim(); // Lấy giá trị người dùng nhập vào

    if (!inputName) {
      alert("Vui lòng nhập tên đại lý!");
      return;
    }

    //tiền nợ
    debt = 0;

    getDealerInfo(inputName)
      .then((matchedAgency) => {
        console.log(matchedAgency);
        if (matchedAgency) {
          // Tự động điền thông tin nếu tìm thấy đại lý
          addressInput.value = matchedAgency.quan || "";
          phoneInput.value = matchedAgency.sdt || "";
          emailInput.value = matchedAgency.email || "";
          debt = matchedAgency.tong_no || "";
          debt = parseFloat(debt);
        } else {
          // Xóa thông tin nếu không tìm thấy đại lý
          addressInput.value = "";
          phoneInput.value = "";
          emailInput.value = "";
          alert("Không tìm thấy đại lý!");
        }
      })
      .catch((error) => {
        console.error("Lỗi khi lấy thông tin đại lý:", error.message);
        alert("Có lỗi xảy ra khi truy vấn thông tin đại lý");
        addressInput.value = "";
        phoneInput.value = "";
        emailInput.value = "";
      });
  });
}

function clearStorage() {
  localStorage.removeItem("input_name");
  localStorage.removeItem("input_address");
  localStorage.removeItem("input_phone");
  localStorage.removeItem("input_email");
  localStorage.removeItem("input_date");
  localStorage.removeItem("input_price");
}

// Hàm xử lý khi nhấn nút "Lập phiếu"
function create_receipt() {
  // Lấy dữ liệu từ các trường input
  const name = document.querySelector('input[name="input_name"]').value.trim();
  const address = document
    .querySelector('input[name="input_address"]')
    .value.trim();
  const phone = document
    .querySelector('input[name="input_phone"]')
    .value.trim();
  const email = document
    .querySelector('input[name="input_email"]')
    .value.trim();
  const date = document.querySelector('input[name="input_date"]').value;
  const input_price = document.querySelector('input[name="input_price"]');
  const price = parseFloat(input_price.value);

  // Kiểm tra dữ liệu đầu vào
  if (!name || !address || !phone || !email || !date || !price) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  if (isNaN(price) || Number(price) <= 0) {
    alert("Số tiền thu không hợp lệ!");
    return;
  }

  if (price > debt) {
    alert(
      `Đại lý hiện đang nợ: ${formatCurrency(
        debt
      )}\nVui lòng không thu vượt quá số tiền đang nợ`
    );
    return;
  }

  // Định nghĩa nội dung file PDF
  const docDefinition = {
    content: [
      {
        text: "PHIẾU THU TIỀN",
        style: "header",
        alignment: "center",
        margin: [0, 10, 0, 20], // Căn lề trên, phải, dưới, trái
      },
      {
        table: {
          widths: ["30%", "70%"],
          body: [
            [
              { text: "Đại lý:", bold: true },
              { text: name, alignment: "left" },
            ],
            [
              { text: "Địa chỉ (quận):", bold: true },
              { text: address, alignment: "left" },
            ],
            [
              { text: "Điện thoại:", bold: true },
              { text: phone, alignment: "left" },
            ],
            [
              { text: "Email:", bold: true },
              { text: email, alignment: "left" },
            ],
          ],
        },
        layout: "noBorders", // Xóa border của bảng
        margin: [0, 0, 0, 20],
      },
      {
        text: "Thông tin thu tiền",
        style: "subheader",
        alignment: "left",
        margin: [0, 10, 0, 10], // Căn lề trên, phải, dưới, trái
      },
      {
        table: {
          widths: ["50%", "50%"],
          body: [
            [
              { text: "Ngày thu tiền:", bold: true },
              { text: date, alignment: "center" },
            ],
            [
              { text: "Số tiền thu:", bold: true },
              {
                text: formatCurrency(price),
                alignment: "center",
                color: "red",
                bold: true,
              },
            ],
          ],
        },
        layout: "headerLineOnly", // Đường kẻ bên dưới header
        margin: [0, 0, 0, 20],
      },
      {
        columns: [
          {
            text: "Chữ ký người nộp tiền",
            alignment: "left",
            margin: [0, 50, 0, 0],
          },
          {
            text: "Chữ ký người lập phiếu",
            alignment: "left",
            margin: [0, 50, 0, 0],
          },
        ],
      },
    ],
    styles: {
      header: { fontSize: 22, bold: true, color: "#333" },
      subheader: { fontSize: 18, bold: true, color: "#555" },
      footer: { fontSize: 12, bold: true, italics: true, color: "#555" },
      tableHeader: { bold: true, fontSize: 14, color: "#000" },
    },
    defaultStyle: {
      font: "Roboto",
    },
  };

  // Tạo và tải file PDF
  pdfMake.createPdf(docDefinition).download(`phieu-thu-tien-${name}.pdf`);

  // Tạo đối tượng data
  const data = {
    name: name,
    address: address,
    phone: phone,
    email: email,
    date: date,
    price: price,
  };

  // Gọi hàm post với dữ liệu
  post(data)
    .then((result) => {
      console.log("Dữ liệu đã được gửi thành công:", result);
    })
    .catch((error) => {
      console.error("Có lỗi xảy ra khi gửi dữ liệu:", error);
    });
}

// Định dạng tiền USD
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD", // Đặt mã tiền tệ thành USD
  }).format(amount);
}

// Hàm gọi API từ frontend (method GET)
function getDealerInfo(dealerName) {
  const url = `/dealer?dealerName=${encodeURIComponent(dealerName)}`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw new Error(data.error || "Không thể kết nối đến backend");
        });
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error.message);
      return null;
    });
}

function post(data) {
  console.log(data);
  const url = "/delear";
  try {
    const response = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Lỗi khi gửi POST: ${response.statusText}`);
    }

    const result = response.json();
    return result; // Trả về dữ liệu từ server
  } catch (error) {
    console.error("Lỗi:", error.message);
    throw error; // Ném lỗi để xử lý bên ngoài nếu cần
  }
}

listen();
