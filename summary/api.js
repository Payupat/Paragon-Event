const city = "planetcomm";

const api = {
  // streaming: `https://city.planetcloud.cloud/dm/planetcomm/camera/list`,
  event: `http://172.16.100.30:8000/alert/event`,
  streaming: `http://172.16.100.30:8000/alert/cctv`,
  socket:`ws://172.16.100.30:8000/ws/alerts`
  // 172.16.100.30
  // 49.229.152.59:8000
};

async function getStreaming() {
  const res = await fetch(api.streaming);
  return await res.json();
}

async function getEvent() {
  const res = await fetch(api.event);
  return await res.json();
}
