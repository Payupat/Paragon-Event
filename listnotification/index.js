var tableDaily;

function convertISOToDateTime(isoDateTime) {
  let dateTimeString = isoDateTime.replace("T", " ").replace("Z", "");

  let dateTime = new Date(dateTimeString);
  let year = dateTime.getFullYear();
  let month = ("0" + (dateTime.getMonth() + 1)).slice(-2);
  let day = ("0" + dateTime.getDate()).slice(-2);
  let hours = ("0" + dateTime.getHours()).slice(-2);
  let minutes = ("0" + dateTime.getMinutes()).slice(-2);
  let seconds = ("0" + dateTime.getSeconds()).slice(-2);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function InitDailyTable(eventData) {
  var dataOnTable = [];
  for (var i = 0; i < eventData.length; i++) {
    dataOnTable.push([
      convertISOToDateTime(eventData[i].timestamp),
      eventData[i].camera_name,
      eventData[i].location,
      eventData[i].event_type.name_th,
      eventData[i].description?.name || "",
      "<a target='_blank' href='./viewer/?imgurl=" +
        eventData[i].image.thumbnail +
        "&topic=" +
        eventData[i].event_type.name_th +
        "'><img src='" +
        eventData[i].image.thumbnail +
        "' width=80 height=80 /></a>",
      eventData[i].image.image_compare !== null
        ? "<a target='_blank' href='./viewer/?imgurl=" +
          eventData[i].image.image_compare +
          "&topic=" +
          eventData[i].event_type.name_th +
          "'><img src='" +
          eventData[i].image.image_compare +
          "' width=80 height=80 /></a>"
        : "",
      eventData[i].accuracy !== null ? eventData[i].accuracy + " %" : "",
    ]);
  }

  tableDaily = $("#create_table").DataTable({
    data: dataOnTable,
    dom: "Bfrtip",
    lengthChange: false,
    responsive: true,
    scrollY: "60vh",
    scrollCollapse: false,
    order: [[0, "desc"]],
    language: {
      emptyTable: "ไม่มีข้อมูล",
    },
    buttons: [
      {
        extend: "excel",
      },
    ],
  });

  var dt_search_0 = document.getElementById("dt-search-0");
  dt_search_0.classList.add("mb-3");

  // img, video
  var img_video = document.querySelectorAll("td > a > img");
  img_video.forEach(function (element) {
    element.removeAttribute("style");
  });

  var display_table = document.querySelector(".display_table");
  display_table.classList.add("px-3");

  var dt_search = document.querySelector(".dt-search");

  var dtColumnTitles = document.querySelectorAll(".dt-column-title");
  dtColumnTitles.forEach(function (element) {
    element.style.color = "#35C8EE";
  });
  var dt_info = document.querySelector(".dt-info");
  dt_info.classList.add("mt-3");

  dt_search.style.color = "#35C8EE";
  dt_info.style.color = "#35C8EE";

  document.querySelector(".csv").style.display = "block";

  // const creatButton = document.createElement("div")
  // creatButton.className = `px-4 bg-white w-20 text-center`
  // creatButton.innerHTML = `<p>CSV</p>`
  // dt_search.appendChild(creatButton);
}

function ShowAlert(data) {
  // console.log(data);

  var audio = new Audio("./assets/file/beep_sound.mp3");
  var playPromise = audio.play();

  var newAlert = document.createElement("div");
  const overlay = document.querySelector(".blur");

  overlay.style.display = "block";

  newAlert.className =
    "popupalert1 transform scale-100 transition-transform duration-500 ease-in-out border border-[#F44336] rounded w-[40%] z-50 absolute top-[20%] left-[30%] bg-[#102A43] p-2 pl-4 text-white";

  newAlert.innerHTML = `
    <div>${
      data.event.type == "Face recognized"
        ? ` <p class="text-[#35C8EE] pb-1 text-xl font-light">${data.event.name_th}</p>
        <div class="flex w-[250px] h-[200px]">
            <img src="${data.thumbnail}" alt="" class="w-[250px] h-[200px]">
            <img src="${data.image_compare}" alt="" class="w-[250px] h-[200px] mx-2">
        </div>`
        : `<p class="text-[#35C8EE] pb-1 text-xl font-light">${data.event.name_th}</p>
        <div class="flex justify-between w-[250px] h-[200px]">
            <img src="${data.thumbnail}" alt="" class="w-[250px] h-[200px]">
        </div>`
    }
        <div class="text-lg">
        ${
          data.event.type == "Face recognized"
            ? `<div class="py-1 flex ">
                <div class="w-1/2">
                    <p class="text-[#35C8EE] py-1">เวลา</p>
                    <p>
                      ${data.timestamp}
                    </p>
                </div>
                <div>
                    <p class="text-[#35C8EE] py-1">ชื่อ-นามสกุล</p>
                    <p>${data.description.name}</p>
                </div>
              </div>
            `
            : `
            <p class="text-[#35C8EE] py-1">เวลา</p>
            <p class="py-1">${data.timestamp}</p>`
        }
            <div class="flex ">
                <div class="w-1/2">
                    <p class="text-[#35C8EE] py-1">สถานที่</p>
                    <p>${data.location}</p>
                </div>
                <div>
                    <p class="text-[#35C8EE] py-1">กล้อง</p>
                    <p>${data.camera_name}</p>
                </div>
            </div>          
        </div>
        <div class="confirm1 select-none cursor-pointer text-[#102A43] hover:bg-[#0ea3ca] bg-[#35C8EE] p-3 my-2 rounded w-32 text-center">
            รับทราบ
        </div>
    </div>
  `;

  document.body.appendChild(newAlert);
  document.body.appendChild(overlay);

  var confirmButton = newAlert.querySelector(".confirm1");

  confirmButton.addEventListener("click", function () {
    newAlert.remove();

    var remainingAlerts = document.querySelectorAll("[class^='popupalert']");
    if (remainingAlerts.length === 0) {
      overlay.style.display = "none";
    }
  });
}

function renderEvtSocket(data) {
  ShowAlert(data);
  data.timestamp = convertISOToDateTime(data.timestamp);

  let newRowData = [
    data.timestamp,
    data.camera_name || "",
    data.location || "",
    data.event?.name_th || "",
    data.description?.name || "",
    `<a target='_blank' href='./viewer/?imgurl=${data.thumbnail}&topic=${data.event.name_th}'><img src='${data.thumbnail}' width=80 height=80 /></a>`,
    data.image_compare !== null
      ? `<a target='_blank' href='./viewer/?imgurl=${data.image_compare}&topic=${data.event.name_th}'><img src='${data.image_compare}' width=80 height=80 /></a>`
      : "",
    data.accuracy !== null ? `${data.accuracy} %` : "",
  ];

  tableDaily.row.add(newRowData).draw();
}

function connectSocket() {
  const exampleSocket = new WebSocket(api.socket);

  exampleSocket.onmessage = (event) => {
    const jsonData = JSON.parse(event.data);
    if (jsonData.message != "Conncet Success ") {
      renderEvtSocket(jsonData.message);
    }
  };
}

function convertToExcel() {
  // สร้าง workbook และ worksheet
  var workbook = new ExcelJS.Workbook();
  var worksheet = workbook.addWorksheet("Data");

  // เรียกใช้ข้อมูลจาก DataTable
  var data = tableDaily.data().toArray();

  const columnHeaders = [
    { header: "เวลา", key: "เวลา", width: 20 },
    { header: "กล้อง", key: "กล้อง", width: 20 },
    { header: "สถานที่", key: "สถานที่", width: 20 },
    { header: "ประเภท", key: "ประเภท", width: 25 },
    { header: "ชื่อ-นามสกุล", key: "ชื่อ-นามสกุล", width: 25 },
    { header: "รูป", key: "รูป", width: 80 },
    { header: "รูปภาพต้นฉบับ", key: "รูปภาพต้นฉบับ", width: 80 },
    { header: "ความแม่นยำ", key: "ความแม่นยำ", width: 25 },
  ];

  // เพิ่มหัวข้อคอลัมน์
  worksheet.columns = columnHeaders.map((header) => ({
    header: header.header,
    key: header.key,
    width: header.width,
  }));

  // เพิ่มข้อมูลลงใน worksheet
  data.forEach((row) => {
    var parser = new DOMParser();

    var htmlDoc5 = parser.parseFromString(row[5], "text/html");
    var imgSrc5 = htmlDoc5.querySelector("img").src;
    row[5] = imgSrc5;

    var htmlDoc6 = parser.parseFromString(row[6], "text/html");
    // ดึง URL ของรูปภาพจากแท็ก img สำหรับ array ที่ 6
    var imgElement6 = htmlDoc6.querySelector("img");
    var imgSrc6 = imgElement6 ? imgElement6.src : null;

    row[6] = imgSrc6 || "";

    // worksheet.addRow(row);
    var rowAdded = worksheet.addRow(row);

    // กำหนด underline สำหรับเซลล์ในคอลัมน์ที่ 5 และ 6
    if (rowAdded.getCell(6).value) {
      rowAdded.getCell(6).font = { underline: true };
    }

    if (rowAdded.getCell(7).value) {
      rowAdded.getCell(7).font = { underline: true };
    }
  });

  // สร้างไฟล์ Excel
  workbook.xlsx.writeBuffer().then(function (buffer) {
    // สร้าง Blob จาก buffer
    var blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // สร้าง URL สำหรับ Blob
    var url = window.URL.createObjectURL(blob);

    // สร้าง element a สำหรับดาวน์โหลดไฟล์ Excel
    var a = document.createElement("a");
    a.href = url;
    a.download = "report_event.xlsx";
    document.body.appendChild(a);

    // คลิกที่ element a เพื่อดาวน์โหลดไฟล์ Excel
    a.click();

    // ลบ element a ที่สร้างขึ้น
    document.body.removeChild(a);

    // ล้าง URL ที่สร้างขึ้น
    window.URL.revokeObjectURL(url);
  });
}

// function convertToExcel() {
//   // สร้าง workbook และ worksheet
//   var workbook = new ExcelJS.Workbook();
//   var worksheet = workbook.addWorksheet("Data");

//   // เรียกใช้ข้อมูลจาก DataTable
//   var data = tableDaily.data().toArray();

//   const columnHeaders = [
//     { header: "เวลา", key: "เวลา", width: 20 },
//     { header: "กล้อง", key: "กล้อง", width: 20 },
//     { header: "สถานที่", key: "สถานที่", width: 20 },
//     { header: "ประเภท", key: "ประเภท", width: 25 },
//     { header: "ชื่อ-นามสกุล", key: "ชื่อ-นามสกุล", width: 25 },
//     { header: "รูป", key: "รูป", width: 50 },
//     { header: "รูปภาพต้นฉบับ", key: "รูปภาพต้นฉบับ", width: 50 },
//     { header: "ความแม่นยำ", key: "ความแม่นยำ", width: 25 },
//   ];

//   // เพิ่มหัวข้อคอลัมน์
//   worksheet.columns = columnHeaders.map((header) => ({
//     header: header.header,
//     key: header.key,
//     width: header.width,
//   }));

//   // เพิ่มข้อมูลลงใน worksheet
//   data.forEach(async (row) => {
//     var parser = new DOMParser();

//     var htmlDoc5 = parser.parseFromString(row[5], "text/html");
//     var imgSrc5 = htmlDoc5.querySelector("img").src;

//     // โหลดรูปภาพและแปลงเป็น base64
//     try {
//       const response = await fetch(imgSrc5);
//       const blob = await response.blob();
//       const reader = new FileReader();
//       reader.readAsDataURL(blob);
//       reader.onloadend = function () {
//         row[5] = reader.result.split(",")[1]; // เก็บ base64 ลงในข้อมูล
//         worksheet.addRow(row);
//       };
//       row[5] = imgSrc5
//     } catch (error) {
//       console.error("Error loading image:", error);
//     }

//     var htmlDoc6 = parser.parseFromString(row[6], "text/html");
//     var imgElement6 = htmlDoc6.querySelector("img");
//     var imgSrc6 = imgElement6 ? imgElement6.src : null;

//     row[6] = imgSrc6 || "";

//     worksheet.addRow(row);
//   });

//   // สร้างไฟล์ Excel
//   workbook.xlsx.writeBuffer().then(function (buffer) {
//     // สร้าง Blob จาก buffer
//     var blob = new Blob([buffer], {
//       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     });

//     // สร้าง URL สำหรับ Blob
//     var url = window.URL.createObjectURL(blob);

//     // สร้าง element a สำหรับดาวน์โหลดไฟล์ Excel
//     var a = document.createElement("a");
//     a.href = url;
//     a.download = "report_event.xlsx";
//     document.body.appendChild(a);

//     // คลิกที่ element a เพื่อดาวน์โหลดไฟล์ Excel
//     a.click();

//     // ลบ element a ที่สร้างขึ้น
//     document.body.removeChild(a);

//     // ล้าง URL ที่สร้างขึ้น
//     window.URL.revokeObjectURL(url);
//   });
// }

async function initialize() {
  try {
    const evtdata = await getEvent();
    InitDailyTable(evtdata);

    connectSocket();

    //   setInterval(function() {
    //     console.log(tableDaily.data());
    // }, 30000);
  } catch (error) {}
}
window.addEventListener("load", initialize);
