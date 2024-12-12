// lấy danh sách báo cáo doanh số
function getListRevenue(month, year) {
  fetch(`/api/list-revenue?month=${month}&year=${year}`, {
    method: "GET",
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        return response.json().then((data) => {
          throw new Error(data.message || "Đã có lỗi xảy ra");
        });
      }
    })
    .then((results) => {
      document.querySelector(".report").classList.remove("hidden");
      document.querySelector(".revenue-table").classList.remove("hidden");

      // render dữ liệu
      let i = 1;
      let stringTable = "";
      var toCSV = `
        Báo cáo doanh số tháng ${month}/${year}\n\n
        STT,Đại lý,Số phiếu xuất, Tổng giá trị, Tỉ lệ\n`;

      results.data[0].forEach(function (each) {
        stringTable += `
              <tr>
                  <td>${i}</td>
                  <td>${each.ten_dai_ly}</td>
                  <td>${each.so_luong_phieu_xuat}</td>
                  <td>${each.tong_gia_tri}</td>
                  <td>${each.ti_le}%</td>
              </tr>`;
        toCSV += `${i},${each.ten_dai_ly},${each.so_luong_phieu_xuat},${each.tong_gia_tri},${each.ti_le}%\n`;
        i++;
      });

      downloadFile(toCSV, `ReportRevenue_${month}/${year}.CSV`);

      document.querySelector(".revenue-table .revenue-body").innerHTML =
        stringTable;
    })
    .catch((error) => console.error("Error", error));
}

//lấy danh sách báo cái công nợ
function getListDebt(month, year) {
  fetch(`/api/list-debt?month=${month}&year=${year}`, {
    method: "GET",
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        return response.json().then((data) => {
          throw new Error(data.message || "Đã có lỗi xảy ra");
        });
      }
    })
    .then((results) => {
      document.querySelector(".report").classList.remove("hidden");
      document.querySelector(".debt-table").classList.remove("hidden");

      // render dữ liệu
      let i = 1;
      let stringTable = "";
      var toCSV = `
      Báo cáo công nợ tháng ${month}/${year}\n\n
      STT,Đại lý,Nợ đầu, Phát sinh, Nợ cuối\n`;

      results.data[0].forEach(function (each) {
        stringTable += `
            <tr>
                <td>${i}</td>
                <td>${each.TenDaiLy}</td>
                <td>${each.NoDau}</td>
                <td>${each.PhatSinh}</td>
                <td>${each.NoCuoi}</td>
            </tr>`;
        toCSV += `${i},${each.TenDaiLy},${each.NoDau},${each.PhatSinh},${each.NoCuoi}\n`;
        i++;
      });

      downloadFile(toCSV, `ReportDebt_${month}/${year}.CSV`);

      document.querySelector(".debt-table .debt-body").innerHTML = stringTable;
    })
    .catch((error) => console.error("Error", error));
}

function getList() {
  const btnActive = document.querySelector(".btn-report-writing");
  const monthInput = document.querySelector("#month");
  const yearInput = document.querySelector("#year");

  btnActive.addEventListener("click", function () {
    const month = monthInput.value;
    const year = yearInput.value;

    if (month === "" || year === "") {
      alert("Tháng hoặc năm không hợp lệ");
      return;
    }

    const radios = document.querySelectorAll("#opt");

    if (!radios[0].checked && !radios[1].checked) {
      alert("Vui lòng chọn loại báo cáo");
      return;
    }

    if (radios[0].checked) {
      getListRevenue(month, year);
    }

    if (radios[1].checked) {
      getListDebt(month, year);
    }
  });
}

function downloadFile(content, filename) {
  let btnActive = document.querySelector(".btn-download");

  btnActive.onclick = function () {
    const encodedUri = "data:text/csv;charset=utf-8,\uFEFF" + content;
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
}

getList();
