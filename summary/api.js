const city = "planetcomm";

const api = {
  // streaming: `https://city.planetcloud.cloud/dm/planetcomm/camera/list`,
  event: `http://192.168.100.87:8000/alert/event`,
  streaming:`http://192.168.100.87:8000/alert/cctv`
};

async function getStreaming() {
  const res = await fetch(api.streaming);
  return await res.json();
}

async function getEvent() {
  const res = await fetch(api.event);
  return await res.json();
}
