function renderVideo(data) {

  const loadingElements = document.querySelectorAll(".londingcctv");
  loadingElements.forEach((element) => {
    element.style.display = "none";
  });
  var videoContainer = document.getElementById("video");
  var players = [];

  const maxVideos = 2;

  for (var i = 0; i < Math.min(data.length, maxVideos); i++) {
    // const uuid = data[i].lastTelemetry.uuid;
    console.log(data[i]);
    

    var divElement = document.createElement("div");
    divElement.className = "video-container";
    var videoElement = document.createElement("video");

    videoElement.id = "hls-player-" + i;
    videoElement.className =
      "video-js vjs-fluid vjs-default-skin max-w-[24rem]";
    videoElement.controls = true;
    videoElement.autoplay = true;
    videoElement.muted = true;

    videoElement.width = 360;
    videoElement.height = 160;
    // videoElement.loop = true;

    // console.log(data);

    var sourceElement = document.createElement("source");
    sourceElement.type = "application/x-mpegURL";
    sourceElement.src = data[i].rtsp
    // sourceElement.src =
    //   `https://streaming.planetcloud.cloud/streaming/${city}/stream/` +
    //   uuid +
    //   "/channel/0/hls/live/index.m3u8";

    videoElement.appendChild(sourceElement);
    divElement.appendChild(videoElement);
    videoContainer.appendChild(videoElement);

    var player = videojs("hls-player-" + i);

    // player.pause();

    players.push(player);
    // player = videojs('hls-player2');
    player.play();

    // console.log(data[i]);
  }
}

function ShowAlert(data) {
  var audio = new Audio('./assets/file/beep_sound.mp3');
  var playPromise = audio.play();

  playPromise;

  var alertImgContainer = document.querySelector(".alertimg");
  var newAlert = document.createElement("div");
  var newimg = document.createElement("div");
  const overlay = document.querySelector(".blur");

  overlay.style.display = "block";

  newimg.className = "alertevt1 absolute text-[#35C8EE] top-[28%] left-[26%]";
  newimg.innerHTML = `${
    data.event.type === "Face recognized"
      ? `<img src="./assets/image/alert-face.gif" alt="" class="max-w-[80px]">`
      : data.event.type === "Fight"
      ? `<img src="./assets/image/alert-fight.gif" alt="" class="max-w-[80px]">`
      : data.event.type === "Slip"
      ? `<img src="./assets/image/alert-slip.gif" alt="" class="max-w-[80px]">`
      : data.event.type === "Gun"
      ? `<img src="./assets/image/alert-slip.gif" alt="" class="max-w-[80px]">`
      : data.event.type === "Abandoned object"
      ? `<img src="./assets/image/alert-dorbox.gif" alt="" class="max-w-[80px]">`
      : `<img src="./assets/image/alert-face.gif" alt="" class="max-w-[80px]">`
  }`;

  newAlert.className =
    "popupalert1 transform scale-100 transition-transform duration-500 ease-in-out border border-[#F44336] rounded w-[40%] z-50 absolute top-[28%] right-[8%] bg-[#102A43] p-2 pl-4 text-white";

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

  alertImgContainer.appendChild(newimg);
  document.body.appendChild(newAlert);
  document.body.appendChild(overlay);

  var confirmButton = newAlert.querySelector(".confirm1");

  confirmButton.addEventListener("click", function () {
    newAlert.remove();
    newimg.style.display = "none";

    var remainingAlerts = document.querySelectorAll("[class^='popupalert']");
    if (remainingAlerts.length === 0) {
      overlay.style.display = "none";
    }
  });
}

function ShowVIP(data) {
  
  // "พายุพัฒน์ "
  // description.name = "พายุพัฒน์ "
  // ฉัตรขวัญ 

  // vip_kwan.png
  var newVip = document.createElement("div");
  newVip.id = "vipElement"
  newVip.className = "absolute inset-0 flex items-center justify-center z-[100] "

  let imageSrc;
  if (data.description.name === "พายุพัฒน์ ") {
    imageSrc = "./assets/image/vip_aomsin.png";
  } else if (data.description.name === "ฉัตรขวัญ ") {
    imageSrc = "./assets/image/vip_kwan.png";
  }  else if(data.description.name === "พันเอก สรรพชัย หุวะนันทน์") {
    imageSrc = "./assets/image/vip_nawa.png"
  }


  newVip.innerHTML = `
    <div class="w-[74%] relative">
      <img src="./assets/image/bg1.png" alt="">
      <div class="absolute z-50 top-0 right-0 m-2 cursor-pointer">
          <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" id="closeBtn">Close</button>
        </div>
      <div class="absolute inset-0 flex flex-col items-center justify-center text-white">
          <img src=${imageSrc} alt="">
      </div>
    </div>
  `

  document.body.appendChild(newVip);

  document.getElementById("closeBtn").addEventListener("click", function() {
    newVip.remove(); // Remove the newVip element when the button is clicked
  });
}

function renderEvt(data) {
  let reversedData = data.slice();
  reversedData.reverse();

  let tbody_fr = document.getElementById("tbody_fr");
  tbody_fr.innerHTML = "";

  console.log(reversedData);
  

  for (let i = 0; i < 5 && i < reversedData.length; i++) {
    tbody_fr.innerHTML += `
      <tr class="text-center">
          <td class="py-7">${convertISOToDateTime(reversedData[i].timestamp)}</td>
          <td>${reversedData[i].camera_name || ""}</td>
          <td>${reversedData[i].location || ""}</td>
          <td>${reversedData[i].event_type?.name_th || ""}</td>
          <td>${reversedData[i].description?.name || ""}</td>
          <td>
            <div class="flex justify-center">
              <a target='_blank' href='./viewer/?imgurl=${
                reversedData[i].image.thumbnail
              }&topic=${reversedData[i].event_type.name_th}'>
                <img src="${reversedData[i].image.thumbnail}" class="w-16" />
              </a>
            </div>
          <td>
      </tr>`;
  }
}

function renderEvtSocket(data) {
  ShowAlert(data);

  let tbody_fr = document.getElementById("tbody_fr");

  let newRow = tbody_fr.insertRow(0);
  newRow.classList.add("text-center");
  let cell1 = newRow.insertCell(0);
  let cell2 = newRow.insertCell(1);
  let cell3 = newRow.insertCell(2);
  let cell4 = newRow.insertCell(3);
  let cell5 = newRow.insertCell(4);
  let cell6 = newRow.insertCell(5);

  // กำหนดค่าของแต่ละเซลล์ในแถวใหม่
  cell1.innerHTML = convertISOToDateTime(data.timestamp) || "";
  cell1.classList.add("py-7");
  cell2.innerHTML = data.camera_name || "";
  cell3.innerHTML = data.location || "";
  cell4.innerHTML = data.event?.name_th || "";
  cell5.innerHTML = data.description?.name || "";
  cell6.innerHTML = `
    <div class="flex justify-center">
      <a target='_blank' href='./viewer/?imgurl=${data.thumbnail}&topic=${data.event.name_th}'>
        <img src="${data.thumbnail}" class="w-16" />
      </a>
    </div>`;

  if (tbody_fr.rows.length >= 3) {
    tbody_fr.deleteRow(-1); // ลบแถวด้านล่างสุดออก
  }
}

function connectSocket() {
  const exampleSocket = new WebSocket(api.socket);

  exampleSocket.onmessage = (event) => {
    const jsonData = JSON.parse(event.data);
    if (jsonData.message != "Conncet Success ") {
      if(jsonData.message.event.name_en === "VIP1"){
        ShowVIP(jsonData.message)

        setTimeout(() => {
          const vipElement = document.getElementById("vipElement");
          if (vipElement) {
            vipElement.remove();
          }
        }, 15000);
      }else{
        renderEvtSocket(jsonData.message);
      }
    }
  };
}

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

async function initialize() {
  try {
    // ShowAlert();
    connectSocket();

    // const data = await getStreaming();
    // const filterCamera4 = data.filter((d) => d.pointId == 7);
    const evtStreaming = await getStreaming();
    
    renderVideo(evtStreaming);

    const evtdata = await getEvent();
    
    renderEvt(evtdata);
  } catch (error) {}
}
window.addEventListener("load", initialize);
