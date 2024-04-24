const city = "planetcomm";

const api = {
  event: `http://172.16.100.30:8000/alert/event`,
  socket: `ws://172.16.100.30:8000/ws/alerts`
};

async function getEvent() {
  const res = await fetch(api.event);
  return await res.json();
}
