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
  // console.log(eventData);
  for (var i = 0; i < eventData.length; i++) {
    dataOnTable.push([
      convertISOToDateTime(eventData[i].timestamp),
      eventData[i].camera_name,
      eventData[i].location,
      eventData[i].event_type.name_th,
      eventData[i].description?.name || "",
      "<a target='_blank' href='./viewer/?imgurl=" +
        eventData[i].image.thumbnail +
        "'><img src='" +
        eventData[i].image.thumbnail +
        "' width=80 height=80 /></a>",
      eventData[i].image.image_compare !== null
        ? "<a target='_blank' href='./viewer/?imgurl=" +
          eventData[i].image.image_compare +
          "'><img src='" +
          eventData[i].image.image_compare +
          "' width=80 height=80 /></a>"
        : "",
      eventData[i].accuracy !== null ? eventData[i].accuracy + " %" : "0 %",
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
  dt_info.classList.add("mt-3")

  dt_search.style.color = "#35C8EE";
  dt_info.style.color = "#35C8EE";
}

function ShowAlert(data) {
  console.log(data);

  var audio = new Audio('./assets/file/beep_sound.mp3');
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
  console.log(data);
  ShowAlert(data)

  data.timestamp = convertISOToDateTime(data.timestamp);

  let newRowData = [
    data.timestamp,
    data.camera_name || "",
    data.location || "",
    data.event?.name_th || "",
    data.description?.name || "",
    `<a target='_blank' href='./viewer/?imgurl=${data.thumbnail}'><img src='${data.thumbnail}' width=80 height=80 /></a>`,
    data.image_compare !== null ? `<a target='_blank' href='./viewer/?imgurl=${data.image_compare}'><img src='${data.image_compare}' width=80 height=80 /></a>` : "",
    data.accuracy !== null ? `${data.accuracy} %` : "0 %"
  ];

  tableDaily.row.add(newRowData).draw();

}

function connectSocket() {
  const exampleSocket = new WebSocket("ws://192.168.100.87:8000/ws/alerts");

  exampleSocket.onmessage = (event) => {
    const jsonData = JSON.parse(event.data);
    if (jsonData.message != "Conncet Success ") {
      renderEvtSocket(jsonData.message);
    }
  };
}

async function initialize() {
  try {
    connectSocket();
    const evtdata = await getEvent();
    InitDailyTable(evtdata);
  } catch (error) {}
}
window.addEventListener("load", initialize);
