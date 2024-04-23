const city = "planetcomm";

const api = {
  event: `http://192.168.100.87:8000/alert/event`,
};

async function getEvent() {
  const res = await fetch(api.event);
  return await res.json();
}
